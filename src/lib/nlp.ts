import { knowledgeBase as knowledgeBaseCore, type KbEntry } from "./knowledge-base";
import { knowledgeBaseExtra } from "./knowledge-base-extra";

const knowledgeBase: KbEntry[] = [...knowledgeBaseCore, ...knowledgeBaseExtra];

const STOPWORDS = new Set([
  "a","an","the","and","or","but","if","then","than","so","of","in","on","at","to","for","from","by",
  "with","about","into","over","after","is","are","was","were","be","been","being","am","do","does",
  "did","doing","have","has","had","having","i","me","my","we","our","you","your","it","its","this",
  "that","these","those","there","here","what","which","who","whom","how","when","where","why","can",
  "could","should","would","will","shall","may","might","must","not","no","yes","please","tell","explain",
  "show","give","help","want","need","know","use","using","used","work","works","working","make","get",
  "difference","between","mean","means","meaning","question","some","any","all","just",
]);

const SYNONYMS: Record<string, string> = {
  arrays: "list",
  array: "list",
  dict: "dictionary",
  dicts: "dictionary",
  dictionaries: "dictionary",
  lists: "list",
  tuples: "tuple",
  sets: "set",
  strings: "string",
  str: "string",
  funcs: "function",
  func: "function",
  functions: "function",
  methods: "method",
  methods_: "method",
  classes: "class",
  objects: "object",
  loops: "loop",
  looping: "loop",
  iterate: "loop",
  iterating: "loop",
  iteration: "loop",
  errors: "error",
  exceptions: "exception",
  exception: "exception",
  comments: "comment",
  variables: "variable",
  vars: "variable",
  var: "variable",
  files: "file",
  modules: "module",
  imports: "import",
  importing: "import",
  inherit: "inheritance",
  inherits: "inheritance",
  oops: "oop",
  comprehensions: "comprehension",
  types: "type",
  typing: "type",
  immutability: "immutable",
  mutability: "mutable",
  conditionals: "conditional",
  conditions: "condition",
  booleans: "boolean",
  bool: "boolean",
  keys: "key",
  values: "value",
  numbers: "number",
  nums: "number",
};

function stem(word: string): string {
  if (SYNONYMS[word]) return SYNONYMS[word];
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 4 && word.endsWith("es")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  return word;
}

/** Turn Python symbols into words so questions like "== vs is" still carry meaning. */
function spellSymbols(text: string): string {
  return text
    .replace(/f-?string/gi, " fstring ")
    .replace(/:=/g, " walrus ")
    .replace(/==/g, " equality ")
    .replace(/!=/g, " inequality ")
    .replace(/\/\//g, " floordiv ")
    .replace(/\*\*kwargs/gi, " kwargs ")
    .replace(/\*args/gi, " args ")
    .replace(/\*\*/g, " power ")
    .replace(/%/g, " modulo ")
    .replace(/\bself\b/gi, " self ");
}

export function tokenize(text: string): string[] {
  const raw = spellSymbols(text)
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, " ")
    .split(" ")
    .filter(Boolean);

  const out: string[] = [];
  for (const word of raw) {
    if (word.length < 2 && !/^[0-9]$/.test(word)) continue;
    if (STOPWORDS.has(word)) continue;
    out.push(stem(word));
  }
  return out;
}

type IndexedEntry = {
  entry: KbEntry;
  tf: Map<string, number>;
  norm: number;
};

function buildIndex() {
  const docs = knowledgeBase.map((entry) => {
    // keywords weighted higher by repeating them in the document text
    const text = [entry.question, entry.topic, entry.keywords.join(" "), entry.keywords.join(" "), entry.answer].join(" ");
    return { entry, tokens: tokenize(text) };
  });

  const df = new Map<string, number>();
  for (const doc of docs) {
    for (const term of new Set(doc.tokens)) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }

  const total = docs.length;
  const idf = new Map<string, number>();
  for (const [term, count] of df) {
    idf.set(term, Math.log((total + 1) / (count + 0.5)) + 1);
  }

  const indexed: IndexedEntry[] = docs.map(({ entry, tokens }) => {
    const counts = new Map<string, number>();
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);

    const tf = new Map<string, number>();
    let sumSq = 0;
    for (const [term, count] of counts) {
      const weight = (1 + Math.log(count)) * (idf.get(term) ?? 1);
      tf.set(term, weight);
      sumSq += weight * weight;
    }
    return { entry, tf, norm: Math.sqrt(sumSq) || 1 };
  });

  return { indexed, idf };
}

const { indexed, idf } = buildIndex();

export type MatchResult = {
  matched: boolean;
  confidence: number;
  topic?: string;
  answer: string;
  code?: string;
  matchedQuestion?: string;
  suggestions?: string[];
};

const CONFIDENCE_THRESHOLD = 0.28;
const NEAR_MISS_THRESHOLD = 0.15;

export function findAnswer(question: string): MatchResult {
  const tokens = tokenize(question);

  if (tokens.length === 0) {
    return {
      matched: false,
      confidence: 0,
      answer:
        "I couldn't find a Python question in that. Try asking something like \"What is a list comprehension?\" or \"How do I handle a FileNotFoundError?\"",
      suggestions: fallbackSuggestions(),
    };
  }

  const counts = new Map<string, number>();
  for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);

  const queryVec = new Map<string, number>();
  let qSumSq = 0;
  for (const [term, count] of counts) {
    const weight = (1 + Math.log(count)) * (idf.get(term) ?? 1.2);
    queryVec.set(term, weight);
    qSumSq += weight * weight;
  }
  const qNorm = Math.sqrt(qSumSq) || 1;

  const scored = indexed
    .map(({ entry, tf, norm }) => {
      let dot = 0;
      for (const [term, weight] of queryVec) {
        const docWeight = tf.get(term);
        if (docWeight) dot += weight * docWeight;
      }
      const cosine = dot / (qNorm * norm);

      // keyword overlap bonus: rewards direct topical hits
      const kw = new Set(entry.keywords.map(stem));
      let hits = 0;
      for (const term of queryVec.keys()) if (kw.has(term)) hits += 1;
      const overlap = hits / Math.max(queryVec.size, 1);

      // title overlap bonus: the stored question itself is the strongest signal
      const titleTokens = new Set(tokenize(entry.question));
      let titleHits = 0;
      for (const term of queryVec.keys()) if (titleTokens.has(term)) titleHits += 1;
      const titleOverlap = titleHits / Math.max(queryVec.size, 1);

      return { entry, score: cosine * 0.55 + overlap * 0.25 + titleOverlap * 0.2 };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored[0];

  // Near miss: still a plausible page in the notebook, so share it but say it's a guess.
  if (best && best.score >= NEAR_MISS_THRESHOLD && best.score < CONFIDENCE_THRESHOLD) {
    return {
      matched: true,
      confidence: Math.round(best.score * 100) / 100,
      topic: `closest note · ${best.entry.topic}`,
      answer: `I'm not certain that's what you meant. The closest note I have answers "${best.entry.question}":\n\n${best.entry.answer}`,
      ...(best.entry.code ? { code: best.entry.code } : {}),
      matchedQuestion: best.entry.question,
      suggestions: scored.slice(1, 4).map((s) => s.entry.question),
    };
  }

  if (!best || best.score < CONFIDENCE_THRESHOLD) {
    return {
      matched: false,
      confidence: best ? Math.round(best.score * 100) / 100 : 0,
      answer:
        "I don't have a note on that one yet. I cover Python basics, variables, data types, strings, numbers, lists, tuples, dictionaries, sets, conditionals, loops, functions, decorators, generators, OOP, modules and packages, exceptions, files, JSON and CSV, dates, regex, concurrency, testing, tooling and common errors — try one of those, or rephrase with a keyword.",
      suggestions: scored.slice(0, 3).map((s) => s.entry.question),
    };
  }

  return {
    matched: true,
    confidence: Math.min(0.99, Math.round(best.score * 100) / 100),
    topic: best.entry.topic,
    answer: best.entry.answer,
    ...(best.entry.code ? { code: best.entry.code } : {}),
    matchedQuestion: best.entry.question,
  };
}

function fallbackSuggestions(): string[] {
  return [
    "What is a list comprehension?",
    "What is the difference between a list and a tuple?",
    "How do I handle exceptions with try and except?",
  ];
}

export const kbSize = knowledgeBase.length;
