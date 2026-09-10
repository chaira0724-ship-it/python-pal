const KEYWORDS = [
  "def","return","try","except","finally","else","elif","if","for","while","in","with","as","class",
  "import","from","raise","pass","break","continue","and","or","not","is","None","True","False",
  "global","nonlocal","lambda","super","yield",
];

const BUILTINS = [
  "print","open","len","int","str","float","list","dict","set","tuple","range","enumerate","zip",
  "sorted","min","max","sum","isinstance","type","input","abs","any","all",
];

type Token = { text: string; kind: "kw" | "builtin" | "str" | "comment" | "plain" };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const commentAt = findCommentStart(line);
  const code = commentAt === -1 ? line : line.slice(0, commentAt);
  const comment = commentAt === -1 ? "" : line.slice(commentAt);

  const parts = code.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g);
  parts.forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      tokens.push({ text: part, kind: "str" });
      return;
    }
    for (const word of part.split(/(\b[A-Za-z_][A-Za-z0-9_]*\b)/g)) {
      if (!word) continue;
      if (KEYWORDS.includes(word)) tokens.push({ text: word, kind: "kw" });
      else if (BUILTINS.includes(word)) tokens.push({ text: word, kind: "builtin" });
      else tokens.push({ text: word, kind: "plain" });
    }
  });

  if (comment) tokens.push({ text: comment, kind: "comment" });
  return tokens;
}

function findCommentStart(line: string): number {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === "\\") i += 1;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") quote = char;
    else if (char === "#") return i;
  }
  return -1;
}

const KIND_CLASS: Record<Token["kind"], string> = {
  kw: "text-brandsoft",
  builtin: "text-utterance",
  str: "text-utterance/80",
  comment: "text-codeink/45 italic",
  plain: "",
};

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-3 rounded-[10px] bg-code p-4 overflow-x-auto text-codeink">
      <code className="font-mono text-[12.5px] leading-relaxed">
        {code.split("\n").map((line, lineIndex) => (
          <div key={lineIndex}>
            {tokenizeLine(line).map((token, i) => (
              <span key={i} className={KIND_CLASS[token.kind]}>
                {token.text}
              </span>
            ))}
            {line.length === 0 ? "\u00a0" : null}
          </div>
        ))}
      </code>
    </pre>
  );
}
