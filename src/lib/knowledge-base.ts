export type KbEntry = {
  id: string;
  topic: string;
  question: string;
  keywords: string[];
  answer: string;
  code?: string;
};

export const knowledgeBase: KbEntry[] = [
  {
    id: "py-what-is",
    topic: "python basics",
    question: "What is Python?",
    keywords: ["python", "language", "what", "interpreted", "about"],
    answer:
      "Python is a high-level, interpreted programming language known for readable syntax and a huge standard library. It is dynamically typed, supports multiple paradigms (procedural, object-oriented, functional), and is widely used for scripting, web backends, data analysis, and automation.",
  },
  {
    id: "py-run-script",
    topic: "python basics",
    question: "How do I run a Python script?",
    keywords: ["run", "execute", "script", "file", "terminal", "command"],
    answer:
      "Save your code in a file ending in .py, then run it from a terminal with the interpreter. Use python3 on macOS and Linux, python on most Windows installs.",
    code: "python3 hello.py",
  },
  {
    id: "py-comments",
    topic: "python basics",
    question: "How do I write comments in Python?",
    keywords: ["comment", "comments", "hash", "docstring", "note"],
    answer:
      "A single-line comment starts with #. For multi-line documentation use a triple-quoted string right under a def or class — that becomes the docstring.",
    code: '# this is a comment\n\ndef greet(name):\n    """Return a friendly greeting."""\n    return f"Hello, {name}!"',
  },
  {
    id: "py-print-input",
    topic: "python basics",
    question: "How do I print output and read user input?",
    keywords: ["print", "input", "output", "read", "user", "console"],
    answer:
      "print() writes to standard output and input() reads a line from the user as a string. Convert it with int() or float() if you need a number.",
    code: 'name = input("Your name: ")\nage = int(input("Your age: "))\nprint(f"{name} will be {age + 1} next year")',
  },
  {
    id: "py-variables",
    topic: "variables",
    question: "How do variables work in Python?",
    keywords: ["variable", "variables", "assign", "assignment", "declare", "name"],
    answer:
      "You create a variable simply by assigning to it — no type declaration is needed. Names are case-sensitive, can hold any type, and can be reassigned to a different type later. A variable is really a name bound to an object.",
    code: "count = 3\ncount = count + 1\nlabel = \"items\"   # same name style, different type",
  },
  {
    id: "py-naming",
    topic: "variables",
    question: "What are Python naming conventions?",
    keywords: ["naming", "convention", "snake_case", "style", "pep8", "constant"],
    answer:
      "PEP 8 recommends snake_case for variables and functions, CapWords for classes, and UPPER_SNAKE_CASE for constants. A single leading underscore signals 'internal use'.",
    code: "MAX_RETRIES = 3\n\ndef load_user_profile(user_id):\n    ...\n\nclass UserProfile:\n    ...",
  },
  {
    id: "py-data-types",
    topic: "data types",
    question: "What are the built-in data types in Python?",
    keywords: ["data", "type", "types", "builtin", "int", "float", "str", "bool"],
    answer:
      "The core built-ins are int, float, complex, bool, str, bytes, list, tuple, dict, set, frozenset, and NoneType. Use type(x) to inspect a value and isinstance(x, int) to test it.",
    code: 'type(42)        # <class \'int\'>\nisinstance("hi", str)   # True',
  },
  {
    id: "py-mutable",
    topic: "data types",
    question: "What is the difference between mutable and immutable types?",
    keywords: ["mutable", "immutable", "change", "difference", "modify"],
    answer:
      "Mutable objects can be changed in place — list, dict, set. Immutable objects cannot — int, float, str, tuple, frozenset. This matters when passing values to functions: modifying a mutable argument is visible to the caller.",
    code: "nums = [1, 2]\nnums.append(3)      # allowed\n\ntext = \"hi\"\n# text[0] = \"H\"     # TypeError: str is immutable",
  },
  {
    id: "py-type-convert",
    topic: "data types",
    question: "How do I convert between types in Python?",
    keywords: ["convert", "cast", "conversion", "int", "str", "float", "casting"],
    answer:
      "Call the target type as a function: int(), float(), str(), list(), tuple(), set(). Conversions that don't make sense raise ValueError, so wrap risky input in try/except.",
    code: 'int("42")        # 42\nfloat("3.5")     # 3.5\nlist("abc")      # [\'a\', \'b\', \'c\']\nint("abc")       # ValueError',
  },
  {
    id: "py-strings",
    topic: "strings",
    question: "How do I work with strings and f-strings?",
    keywords: ["string", "strings", "fstring", "format", "concatenate", "slice", "text"],
    answer:
      "Strings are immutable sequences of characters. Use f-strings for interpolation, + or join() to combine, and slicing to take parts. Common methods: upper(), lower(), strip(), split(), replace(), startswith().",
    code: 'name = "ada"\nprint(f"Hello {name.title()}")   # Hello Ada\nprint(", ".join(["a", "b"]))     # a, b\nprint("python"[0:3])            # pyt',
  },
  {
    id: "py-lists",
    topic: "lists",
    question: "What is a list and how do I use it?",
    keywords: ["list", "lists", "append", "array", "ordered", "index", "remove"],
    answer:
      "A list is an ordered, mutable sequence written with square brackets. Add with append() or extend(), remove with pop(), remove(), or del, and read items by zero-based index. Negative indexes count from the end.",
    code: 'nums = [3, 1, 2]\nnums.append(4)      # [3, 1, 2, 4]\nnums.sort()         # [1, 2, 3, 4]\nprint(nums[-1])     # 4',
  },
  {
    id: "py-list-slicing",
    topic: "lists",
    question: "How does list slicing work?",
    keywords: ["slice", "slicing", "sublist", "range", "step", "reverse"],
    answer:
      "Slicing takes list[start:stop:step]. start is inclusive, stop is exclusive, and any part can be omitted. A step of -1 reverses the sequence, and a slice always returns a new list.",
    code: "letters = ['a', 'b', 'c', 'd', 'e']\nletters[1:3]     # ['b', 'c']\nletters[:2]      # ['a', 'b']\nletters[::-1]    # ['e', 'd', 'c', 'b', 'a']",
  },
  {
    id: "py-list-vs-tuple",
    topic: "lists and tuples",
    question: "What is the difference between a list and a tuple?",
    keywords: ["list", "tuple", "difference", "vs", "compare", "mutable", "immutable"],
    answer:
      "A list is mutable, so you can append, remove, and reorder items after creating it. A tuple is immutable and slightly faster and lighter, which makes it a good fit for fixed records and for use as a dictionary key.",
    code: "nums = [1, 2, 3]\nnums.append(4)     # fine\n\npoint = (1, 2)\n# point[0] = 9     # TypeError: tuples are immutable",
  },
  {
    id: "py-tuples",
    topic: "tuples",
    question: "What is a tuple and when should I use one?",
    keywords: ["tuple", "tuples", "unpack", "immutable", "fixed", "record"],
    answer:
      "A tuple is an ordered, immutable sequence written with parentheses. Use it for grouped values that shouldn't change — coordinates, database rows, multiple return values. Tuple unpacking assigns several names at once.",
    code: "point = (3, 4)\nx, y = point\n\ndef min_max(values):\n    return min(values), max(values)   # returns a tuple",
  },
  {
    id: "py-dicts",
    topic: "dictionaries",
    question: "How do I use a dictionary in Python?",
    keywords: ["dict", "dictionary", "key", "value", "mapping", "get", "lookup"],
    answer:
      "A dictionary maps keys to values with curly braces. Read with dict[key] or the safer dict.get(key, default), write with dict[key] = value, and delete with del or pop(). Keys must be immutable and unique.",
    code: 'user = {"name": "Ada", "age": 36}\nuser["city"] = "London"\nprint(user.get("email", "none"))   # none\ndel user["age"]',
  },
  {
    id: "py-dict-loop",
    topic: "dictionaries",
    question: "How do I loop over a dictionary?",
    keywords: ["dict", "dictionary", "loop", "iterate", "items", "keys", "values"],
    answer:
      "Iterating a dict yields its keys. Use .items() to get key/value pairs, .keys() for keys only, and .values() for values only.",
    code: 'scores = {"ada": 9, "linus": 7}\nfor name, score in scores.items():\n    print(name, score)',
  },
  {
    id: "py-sets",
    topic: "sets",
    question: "What is a set in Python?",
    keywords: ["set", "sets", "unique", "duplicate", "union", "intersection", "distinct"],
    answer:
      "A set is an unordered collection of unique, hashable items. It is ideal for removing duplicates and for fast membership tests, and it supports mathematical operations like union (|), intersection (&), and difference (-).",
    code: "a = {1, 2, 2, 3}      # {1, 2, 3}\nb = {3, 4}\nprint(a | b)          # {1, 2, 3, 4}\nprint(a & b)          # {3}\nprint(2 in a)         # True",
  },
  {
    id: "py-conditionals",
    topic: "conditionals",
    question: "How do if, elif, and else work?",
    keywords: ["if", "elif", "else", "condition", "conditional", "branch", "boolean"],
    answer:
      "Python branches with if / elif / else, using indentation instead of braces. Conditions are evaluated for truthiness — empty collections, 0, None, and \"\" are falsy. Combine conditions with and, or, and not.",
    code: 'score = 72\nif score >= 90:\n    grade = "A"\nelif score >= 70:\n    grade = "B"\nelse:\n    grade = "C"',
  },
  {
    id: "py-ternary",
    topic: "conditionals",
    question: "Does Python have a ternary operator?",
    keywords: ["ternary", "inline", "one", "line", "if", "expression", "shorthand"],
    answer:
      "Yes — Python has a conditional expression written value_if_true if condition else value_if_false. Keep it to short, readable cases.",
    code: 'status = "adult" if age >= 18 else "minor"',
  },
  {
    id: "py-for-loop",
    topic: "loops",
    question: "How do for loops work in Python?",
    keywords: ["for", "loop", "iterate", "range", "enumerate", "each"],
    answer:
      "A for loop iterates directly over any iterable — no manual index needed. Use range() for a count and enumerate() when you need both index and value. zip() walks two sequences in parallel.",
    code: 'for i in range(3):\n    print(i)              # 0 1 2\n\nfor i, item in enumerate(["a", "b"]):\n    print(i, item)',
  },
  {
    id: "py-while-loop",
    topic: "loops",
    question: "How do I write a while loop with a counter?",
    keywords: ["while", "loop", "counter", "condition", "repeat", "until"],
    answer:
      "A while loop repeats while its condition stays true. Always change something inside the body that eventually makes the condition false, or the loop never ends.",
    code: "count = 0\nwhile count < 3:\n    print(\"tick\", count)\n    count += 1",
  },
  {
    id: "py-break-continue",
    topic: "loops",
    question: "What do break and continue do?",
    keywords: ["break", "continue", "pass", "skip", "exit", "loop"],
    answer:
      "break leaves the innermost loop immediately. continue skips the rest of the current iteration and moves to the next one. pass is a no-op placeholder that does nothing at all.",
    code: "for n in range(10):\n    if n == 5:\n        break\n    if n % 2:\n        continue\n    print(n)      # 0 2 4",
  },
  {
    id: "py-functions",
    topic: "functions",
    question: "How do I define a function in Python?",
    keywords: ["function", "def", "define", "return", "parameter", "argument", "call"],
    answer:
      "Use def, a name, parameters in parentheses, and an indented body. return sends a value back; without it the function returns None. Parameters can have default values and be passed by keyword.",
    code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\ngreet("Ada")\ngreet("Ada", greeting="Hi")',
  },
  {
    id: "py-args-kwargs",
    topic: "functions",
    question: "What are *args and **kwargs?",
    keywords: ["args", "kwargs", "star", "variable", "arguments", "unpack"],
    answer:
      "*args collects extra positional arguments into a tuple and **kwargs collects extra keyword arguments into a dict. They let a function accept any number of arguments.",
    code: 'def report(label, *args, **kwargs):\n    print(label, args, kwargs)\n\nreport("x", 1, 2, mode="fast")\n# x (1, 2) {\'mode\': \'fast\'}',
  },
  {
    id: "py-lambda",
    topic: "functions",
    question: "What is a lambda function and how is it different from def?",
    keywords: ["lambda", "anonymous", "def", "difference", "inline", "sort", "key"],
    answer:
      "A lambda is a small anonymous function limited to a single expression, useful as a throwaway key or callback. def creates a named function with a full body, docstring, and statements — prefer it for anything reusable.",
    code: 'pairs = [("b", 2), ("a", 1)]\npairs.sort(key=lambda p: p[0])\n\nsquare = lambda n: n * n   # prefer def for named logic',
  },
  {
    id: "py-scope",
    topic: "functions",
    question: "How does variable scope work in Python?",
    keywords: ["scope", "global", "local", "nonlocal", "namespace", "visible"],
    answer:
      "Python resolves names local → enclosing → global → builtins (the LEGB rule). Assigning inside a function creates a local name; use global or nonlocal only when you truly need to rebind an outer name.",
    code: "total = 0\n\ndef add(n):\n    global total\n    total += n",
  },
  {
    id: "py-oop-class",
    topic: "oop basics",
    question: "How do I create a class in Python?",
    keywords: ["class", "object", "oop", "init", "instance", "attribute", "method"],
    answer:
      "Define a class with the class keyword and initialise instance state in __init__. The first parameter of every instance method is self, which refers to the instance being worked on.",
    code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return f"{self.name} says woof"\n\nDog("Rex").speak()',
  },
  {
    id: "py-self",
    topic: "oop basics",
    question: "What does self mean in a class?",
    keywords: ["self", "class", "instance", "method", "meaning", "first", "parameter"],
    answer:
      "self is the instance the method was called on. Python passes it automatically, so dog.speak() really calls Dog.speak(dog). You use it to read and set per-instance attributes.",
    code: "class Counter:\n    def __init__(self):\n        self.value = 0\n\n    def bump(self):\n        self.value += 1     # per-instance state",
  },
  {
    id: "py-inheritance",
    topic: "oop basics",
    question: "How does inheritance work in Python?",
    keywords: ["inheritance", "inherit", "subclass", "super", "parent", "override", "base"],
    answer:
      "List the parent class in parentheses after the child class name. The child inherits the parent's methods, can override them, and can call the parent version with super().",
    code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Cat(Animal):\n    def __init__(self, name, indoor=True):\n        super().__init__(name)\n        self.indoor = indoor',
  },
  {
    id: "py-dunder-str",
    topic: "oop basics",
    question: "What are dunder methods like __str__ and __repr__?",
    keywords: ["dunder", "magic", "str", "repr", "method", "special", "len"],
    answer:
      "Dunder (double underscore) methods hook into Python's built-in behaviour. __str__ controls print(), __repr__ the debug view, __len__ powers len(), and __eq__ powers ==.",
    code: 'class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\n    def __repr__(self):\n        return f"Point({self.x}, {self.y})"',
  },
  {
    id: "py-modules",
    topic: "modules and imports",
    question: "How do modules and imports work?",
    keywords: ["module", "import", "from", "package", "library", "as", "install"],
    answer:
      "Any .py file is a module. Import the whole module with import math, or specific names with from math import sqrt. Use as to alias. Third-party packages come from pip install.",
    code: "import math\nfrom math import sqrt\nimport datetime as dt\n\nprint(math.pi, sqrt(9))",
  },
  {
    id: "py-main-guard",
    topic: "modules and imports",
    question: "What does if __name__ == \"__main__\" do?",
    keywords: ["name", "main", "guard", "script", "entry", "point", "dunder"],
    answer:
      "__name__ equals \"__main__\" only when the file is run directly, and equals the module name when it is imported. The guard lets a file be both a runnable script and an importable module.",
    code: 'def main():\n    print("running directly")\n\nif __name__ == "__main__":\n    main()',
  },
  {
    id: "py-exceptions",
    topic: "exception handling",
    question: "How do I handle exceptions with try and except?",
    keywords: ["try", "except", "exception", "error", "handle", "finally", "raise"],
    answer:
      "Put risky code in try and handle failures in except, catching specific exception types rather than bare except. else runs when nothing failed; finally always runs, even after an exception, which makes it right for cleanup.",
    code: 'try:\n    value = int(user_input)\nexcept ValueError:\n    value = 0\nelse:\n    print("parsed cleanly")\nfinally:\n    print("done")',
  },
  {
    id: "py-raise",
    topic: "exception handling",
    question: "How do I raise my own exception?",
    keywords: ["raise", "custom", "exception", "error", "throw", "own"],
    answer:
      "Use raise with an exception instance. For domain-specific failures, subclass Exception so callers can catch exactly your error.",
    code: 'class InsufficientFunds(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds("balance too low")\n    return balance - amount',
  },
  {
    id: "py-file-read",
    topic: "file handling",
    question: "How do I read and write files in Python?",
    keywords: ["file", "open", "read", "write", "with", "close", "text"],
    answer:
      "Use open() inside a with block so the file closes automatically. Mode \"r\" reads, \"w\" overwrites, \"a\" appends. read() gets the whole text; iterating the file gives one line at a time.",
    code: 'with open("notes.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.rstrip())\n\nwith open("notes.txt", "a", encoding="utf-8") as f:\n    f.write("new line\\n")',
  },
  {
    id: "py-file-missing",
    topic: "file handling",
    question: "How do I handle a FileNotFoundError when opening a file?",
    keywords: ["filenotfounderror", "file", "missing", "exist", "error", "open", "handle"],
    answer:
      "Wrap the open() call in try/except and catch FileNotFoundError, then return a sensible default instead of crashing. Checking the path first with pathlib is also fine, but the try/except version is race-free.",
    code: 'def load_config(path):\n    try:\n        with open(path, encoding="utf-8") as f:\n            return f.read().strip()\n    except FileNotFoundError:\n        return ""',
  },
  {
    id: "py-csv",
    topic: "file handling",
    question: "How do I read a CSV file?",
    keywords: ["csv", "file", "read", "rows", "columns", "dictreader"],
    answer:
      "Use the built-in csv module. csv.DictReader gives each row as a dictionary keyed by the header names, which is usually easier to read than index access.",
    code: 'import csv\n\nwith open("data.csv", newline="", encoding="utf-8") as f:\n    for row in csv.DictReader(f):\n        print(row["name"], row["score"])',
  },
  {
    id: "py-comprehension",
    topic: "comprehensions",
    question: "What is a list comprehension?",
    keywords: ["comprehension", "comprehensions", "list", "inline", "loop", "filter", "map"],
    answer:
      "A comprehension builds a new collection in one expression: an output expression, a for clause, and an optional if filter. It is shorter and usually faster than appending in a loop.",
    code: "squares = [n * n for n in range(5)]\nevens = [n for n in range(10) if n % 2 == 0]",
  },
  {
    id: "py-dict-comprehension",
    topic: "comprehensions",
    question: "How do dict and set comprehensions work?",
    keywords: ["dict", "set", "comprehension", "generator", "curly", "key"],
    answer:
      "Same shape as a list comprehension but with braces. Use key: value for a dict, a single expression for a set, and parentheses for a lazy generator expression.",
    code: 'lengths = {w: len(w) for w in ["a", "bb"]}\nunique = {w[0] for w in ["ada", "amy", "bo"]}\nlazy = (n * n for n in range(1000))',
  },
  {
    id: "py-indentation-error",
    topic: "common errors",
    question: "Why do I get an IndentationError?",
    keywords: ["indentationerror", "indentation", "indent", "tab", "space", "error"],
    answer:
      "Python uses indentation to define blocks, so inconsistent or missing indentation is a syntax error. Pick 4 spaces per level and never mix tabs with spaces in the same file.",
    code: "if True:\n    print(\"indented by 4 spaces\")",
  },
  {
    id: "py-typeerror",
    topic: "common errors",
    question: "What causes a TypeError in Python?",
    keywords: ["typeerror", "type", "error", "unsupported", "operand", "concatenate"],
    answer:
      "A TypeError means an operation got the wrong type — commonly adding a string to a number, or calling something that isn't callable. Convert explicitly with int(), float(), or str().",
    code: '# "3" + 1        -> TypeError\nint("3") + 1     # 4\nf"{3}" + "1"     # "31"',
  },
  {
    id: "py-keyerror",
    topic: "common errors",
    question: "Why do I get a KeyError or IndexError?",
    keywords: ["keyerror", "indexerror", "missing", "key", "index", "range", "error"],
    answer:
      "A KeyError means the dictionary key doesn't exist — use .get() with a default or check with in. An IndexError means the list position is out of range — check len() or use a safer slice.",
    code: 'user = {"name": "Ada"}\nuser.get("email", "unknown")\n\nitems = [1, 2]\nitems[5:6]          # [] instead of IndexError',
  },
  {
    id: "py-nameerror",
    topic: "common errors",
    question: "What does NameError mean?",
    keywords: ["nameerror", "undefined", "not", "defined", "typo", "error"],
    answer:
      "NameError means you used a name Python has never seen bound in the current scope — usually a typo, a missing import, or a variable used before assignment.",
    code: "# print(totl)   -> NameError\ntotal = 0\nprint(total)",
  },
  {
    id: "py-none",
    topic: "common errors",
    question: "How do I check for None correctly?",
    keywords: ["none", "null", "check", "is", "equal", "nonetype"],
    answer:
      "Compare with is None and is not None, not ==. A common bug is calling a method on a function result that returned None — for example list.sort() sorts in place and returns None.",
    code: 'if value is None:\n    value = "default"\n\nnums = [2, 1]\nnums.sort()        # returns None; nums is now sorted',
  },
];

export const kbTopics = Array.from(new Set(knowledgeBase.map((e) => e.topic)));
