import type { KbEntry } from "./knowledge-base";

/** Second volume of the notebook: wider coverage of everyday Python questions. */
export const knowledgeBaseExtra: KbEntry[] = [
  // ---------- strings ----------
  {
    id: "x-fstring",
    topic: "strings",
    question: "How do f-strings and string formatting work?",
    keywords: ["fstring", "f", "format", "interpolation", "template", "percent"],
    answer:
      "Prefix a string with f and put expressions inside braces. You can add format specifiers after a colon, like :.2f for two decimals or :>10 for right alignment. str.format() and % formatting are older alternatives.",
    code: 'name = "Ada"\nscore = 91.456\nprint(f"{name} scored {score:.1f}")\nprint("{} scored {}".format(name, score))',
  },
  {
    id: "x-string-methods",
    topic: "strings",
    question: "What are the most useful string methods?",
    keywords: ["method", "upper", "lower", "strip", "split", "join", "replace", "find", "startswith"],
    answer:
      "Strings are immutable, so every method returns a new string. Common ones: upper(), lower(), strip(), split(), join(), replace(), find(), startswith(), endswith(), count(), and the checks isdigit() and isalpha().",
    code: 'text = "  Hello, World  "\nprint(text.strip().lower().replace(",", ""))\nprint("-".join(["a", "b", "c"]))',
  },
  {
    id: "x-reverse-string",
    topic: "strings",
    question: "How do I reverse a string?",
    keywords: ["reverse", "backwards", "slice", "reversed", "string"],
    answer:
      "Slice with a step of -1, or use reversed() and join the characters back together.",
    code: 's = "python"\nprint(s[::-1])\nprint("".join(reversed(s)))',
  },
  {
    id: "x-palindrome",
    topic: "strings",
    question: "How do I check if a string is a palindrome?",
    keywords: ["palindrome", "same", "reverse", "check", "compare"],
    answer:
      "Normalise the text (lowercase, drop spaces and punctuation), then compare it with its reverse.",
    code: 'def is_palindrome(text):\n    clean = "".join(c.lower() for c in text if c.isalnum())\n    return clean == clean[::-1]\n\nprint(is_palindrome("Never odd or even"))',
  },
  {
    id: "x-count-words",
    topic: "strings",
    question: "How do I count words or characters in a string?",
    keywords: ["count", "word", "character", "length", "len", "frequency", "counter"],
    answer:
      "len() gives the character count, split() then len() gives the word count, and collections.Counter gives per-item frequencies.",
    code: 'from collections import Counter\n\ntext = "to be or not to be"\nprint(len(text), len(text.split()))\nprint(Counter(text.split()))',
  },
  {
    id: "x-slicing",
    topic: "strings",
    question: "How does slicing work with negative indexes?",
    keywords: ["slice", "slicing", "index", "negative", "start", "stop", "step", "substring"],
    answer:
      "A slice is sequence[start:stop:step]. start is inclusive, stop is exclusive, and negative numbers count from the end, so -1 is the last item. Omitted parts default to the beginning, the end, and a step of 1.",
    code: "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])   # [1, 2, 3]\nprint(nums[-2:])   # [4, 5]\nprint(nums[::2])   # [0, 2, 4]",
  },

  // ---------- numbers and operators ----------
  {
    id: "x-division",
    topic: "numbers and operators",
    question: "What is the difference between / and // in Python?",
    keywords: ["division", "divide", "floor", "modulo", "remainder", "operator", "power"],
    answer:
      "/ is true division and always gives a float. // is floor division and rounds down to the nearest whole number. % gives the remainder and ** raises to a power.",
    code: "print(7 / 2)   # 3.5\nprint(7 // 2)  # 3\nprint(7 % 2)   # 1\nprint(2 ** 10)  # 1024",
  },
  {
    id: "x-round-float",
    topic: "numbers and operators",
    question: "Why do floats give answers like 0.30000000000000004?",
    keywords: ["float", "rounding", "precision", "decimal", "inaccurate", "round"],
    answer:
      "Floats are binary approximations, so some decimals cannot be stored exactly. Use round() for display, or the decimal module when exact decimal arithmetic matters, such as money.",
    code: 'from decimal import Decimal\n\nprint(0.1 + 0.2)                # 0.30000000000000004\nprint(round(0.1 + 0.2, 2))      # 0.3\nprint(Decimal("0.1") + Decimal("0.2"))',
  },
  {
    id: "x-convert-types",
    topic: "numbers and operators",
    question: "How do I convert between strings, integers and floats?",
    keywords: ["convert", "cast", "int", "float", "str", "input", "conversion", "parse"],
    answer:
      "Call the type as a function: int(\"42\"), float(\"3.5\"), str(42). input() always returns a string, so convert it before doing maths. A bad conversion raises ValueError, so wrap it in try/except when the text comes from a user.",
    code: 'raw = "42"\nnumber = int(raw)\nprint(number + 1, str(number) + "!")',
  },
  {
    id: "x-random",
    topic: "standard library",
    question: "How do I generate random numbers or pick a random item?",
    keywords: ["random", "choice", "shuffle", "randint", "sample", "dice"],
    answer:
      "Use the random module: randint() for a whole number in a range, random() for a float between 0 and 1, choice() to pick from a sequence, shuffle() to reorder a list in place, and sample() for several distinct picks.",
    code: 'import random\n\nprint(random.randint(1, 6))\nprint(random.choice(["red", "green", "blue"]))',
  },
  {
    id: "x-math",
    topic: "standard library",
    question: "How do I do square roots and other maths?",
    keywords: ["math", "sqrt", "square", "root", "pi", "ceil", "floor", "abs"],
    answer:
      "The math module has sqrt(), ceil(), floor(), pow(), pi and the trig functions. abs(), round(), min(), max() and sum() are built in and need no import.",
    code: "import math\n\nprint(math.sqrt(144), math.ceil(2.1), round(math.pi, 3))",
  },

  // ---------- collections ----------
  {
    id: "x-sort",
    topic: "lists and tuples",
    question: "How do I sort a list, including by a custom key?",
    keywords: ["sort", "sorted", "order", "key", "reverse", "lambda", "descending"],
    answer:
      "list.sort() sorts in place and returns None; sorted() returns a new list and works on any iterable. Pass key= for a custom rule and reverse=True for descending order.",
    code: 'people = [("Ada", 36), ("Bo", 24)]\nprint(sorted(people, key=lambda p: p[1]))\nnums = [3, 1, 2]\nnums.sort(reverse=True)\nprint(nums)',
  },
  {
    id: "x-list-methods",
    topic: "lists and tuples",
    question: "What are the main list methods?",
    keywords: ["append", "extend", "insert", "remove", "pop", "index", "clear", "list"],
    answer:
      "append() adds one item, extend() adds every item of another iterable, insert() puts an item at a position, remove() deletes by value, pop() removes by index and returns it, index() finds a position, and count() counts occurrences.",
    code: "items = [1, 2]\nitems.append(3)\nitems.extend([4, 5])\nitems.insert(0, 0)\nprint(items, items.pop())",
  },
  {
    id: "x-remove-duplicates",
    topic: "sets",
    question: "How do I remove duplicates from a list?",
    keywords: ["duplicate", "unique", "distinct", "set", "dedupe", "repeat"],
    answer:
      "Convert to a set for uniqueness (order is lost), or use dict.fromkeys() when you need to keep the original order.",
    code: "nums = [3, 1, 3, 2, 1]\nprint(list(set(nums)))\nprint(list(dict.fromkeys(nums)))  # order kept",
  },
  {
    id: "x-flatten",
    topic: "comprehensions",
    question: "How do I flatten a nested list?",
    keywords: ["flatten", "nested", "nest", "matrix", "2d", "chain", "inner"],
    answer:
      "Use a comprehension with two for clauses, or itertools.chain.from_iterable for one level of nesting.",
    code: "from itertools import chain\n\nmatrix = [[1, 2], [3, 4]]\nprint([n for row in matrix for n in row])\nprint(list(chain.from_iterable(matrix)))",
  },
  {
    id: "x-enumerate-zip",
    topic: "loops",
    question: "How do enumerate() and zip() work?",
    keywords: ["enumerate", "zip", "index", "pair", "parallel", "counter", "together"],
    answer:
      "enumerate() yields (index, item) pairs so you never need a manual counter. zip() walks several sequences side by side and stops at the shortest one.",
    code: 'names = ["Ada", "Bo"]\nscores = [91, 78]\nfor i, name in enumerate(names, start=1):\n    print(i, name)\nfor name, score in zip(names, scores):\n    print(name, score)',
  },
  {
    id: "x-range",
    topic: "loops",
    question: "How does range() work?",
    keywords: ["range", "start", "stop", "step", "count", "numbers", "loop"],
    answer:
      "range(stop) counts from 0, range(start, stop) starts where you say, and range(start, stop, step) skips. The stop value is never included, and range is lazy — wrap it in list() to see the numbers.",
    code: "print(list(range(5)))\nprint(list(range(2, 10, 3)))\nfor i in range(3):\n    print(i)",
  },
  {
    id: "x-any-all-sum",
    topic: "built-in functions",
    question: "What do any(), all(), sum(), min() and max() do?",
    keywords: ["any", "all", "sum", "min", "max", "builtin", "aggregate", "total"],
    answer:
      "any() is True when at least one item is truthy, all() when every item is. sum() totals numbers, min() and max() find extremes and both accept a key= function.",
    code: 'nums = [2, 4, 6]\nprint(all(n % 2 == 0 for n in nums), any(n > 5 for n in nums))\nprint(sum(nums), min(nums), max(nums))\nwords = ["pear", "fig"]\nprint(max(words, key=len))',
  },
  {
    id: "x-collections",
    topic: "standard library",
    question: "What are Counter, defaultdict and namedtuple?",
    keywords: ["collections", "counter", "defaultdict", "namedtuple", "deque", "frequency"],
    answer:
      "They live in the collections module. Counter counts items, defaultdict creates missing values automatically, namedtuple gives tuples named fields, and deque is a fast queue you can push and pop from both ends.",
    code: 'from collections import Counter, defaultdict\n\nprint(Counter("mississippi").most_common(2))\ngroups = defaultdict(list)\ngroups["fruit"].append("fig")\nprint(dict(groups))',
  },
  {
    id: "x-dict-merge",
    topic: "dictionaries",
    question: "How do I merge two dictionaries or set a default value?",
    keywords: ["merge", "update", "combine", "default", "get", "setdefault", "dictionary"],
    answer:
      "Merge with {**a, **b} or a | b on Python 3.9+, and update() to change one in place. get() reads a key with a fallback instead of raising KeyError, and setdefault() inserts the fallback when the key is missing.",
    code: 'a = {"x": 1}\nb = {"y": 2}\nprint({**a, **b})\nprint(a.get("missing", 0))',
  },
  {
    id: "x-sort-dict",
    topic: "dictionaries",
    question: "How do I sort a dictionary by value?",
    keywords: ["sort", "dictionary", "value", "items", "order", "rank"],
    answer:
      "Sort the items() pairs with a key function, then rebuild a dict — dictionaries keep insertion order from Python 3.7.",
    code: 'scores = {"Ada": 91, "Bo": 78, "Cy": 85}\nranked = dict(sorted(scores.items(), key=lambda kv: kv[1], reverse=True))\nprint(ranked)',
  },
  {
    id: "x-unpacking",
    topic: "python basics",
    question: "How does unpacking and swapping variables work?",
    keywords: ["unpack", "unpacking", "swap", "star", "tuple", "assign", "multiple"],
    answer:
      "Assign several names at once from any sequence, use * to collect the rest, and swap without a temporary variable.",
    code: "first, *middle, last = [1, 2, 3, 4]\nprint(first, middle, last)\na, b = 1, 2\na, b = b, a\nprint(a, b)",
  },
  {
    id: "x-copy",
    topic: "common errors",
    question: "What is the difference between a shallow copy and a deep copy?",
    keywords: ["copy", "deepcopy", "shallow", "reference", "alias", "clone", "mutable"],
    answer:
      "Assigning a list gives another name for the same object. list(x) or x[:] makes a shallow copy — the outer list is new but inner objects are shared. copy.deepcopy() copies every level.",
    code: "import copy\n\nnested = [[1, 2], [3]]\nshallow = nested[:]\ndeep = copy.deepcopy(nested)\nshallow[0].append(99)\nprint(nested, deep)",
  },
  {
    id: "x-is-vs-equals",
    topic: "common errors",
    question: "What is the difference between == and is?",
    keywords: ["is", "equal", "identity", "compare", "none", "same", "operator"],
    answer:
      "== compares values, is compares identity — whether two names point to the same object. Use == for data and is only for singletons like None, True and False.",
    code: 'a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)  # True False\nvalue = None\nprint(value is None)',
  },
  {
    id: "x-truthiness",
    topic: "conditionals",
    question: "Which values count as False in Python?",
    keywords: ["truthy", "falsy", "boolean", "empty", "none", "zero", "condition"],
    answer:
      "False, None, 0, 0.0, empty strings, empty lists, tuples, dicts and sets are all falsy. Everything else is truthy, so you can write if items: instead of if len(items) > 0:.",
    code: 'items = []\nif not items:\n    print("nothing to show")',
  },
  {
    id: "x-ternary",
    topic: "conditionals",
    question: "Does Python have a ternary or one-line if?",
    keywords: ["ternary", "inline", "oneline", "conditional", "expression", "else"],
    answer:
      "Yes — value_if_true if condition else value_if_false. Keep it short; nest more than once and a normal if block reads better.",
    code: 'age = 20\nlabel = "adult" if age >= 18 else "minor"\nprint(label)',
  },
  {
    id: "x-match-case",
    topic: "conditionals",
    question: "Is there a switch statement in Python?",
    keywords: ["switch", "match", "case", "structural", "pattern", "select"],
    answer:
      "Python 3.10 added match/case, which does structural pattern matching. Before that, a dictionary of options or a chain of elif is the usual approach.",
    code: 'command = "start"\nmatch command:\n    case "start":\n        print("starting")\n    case "stop":\n        print("stopping")\n    case _:\n        print("unknown")',
  },
  {
    id: "x-walrus",
    topic: "python basics",
    question: "What is the walrus operator :=?",
    keywords: ["walrus", "assignment", "expression", "while", "inline", "operator"],
    answer:
      "The walrus operator assigns a value inside an expression, which saves repeating a call in a loop or condition. It arrived in Python 3.8.",
    code: 'line = "hello world"\nif (n := len(line)) > 5:\n    print(f"{n} characters")',
  },

  // ---------- functions ----------
  {
    id: "x-args-kwargs",
    topic: "functions",
    question: "What are *args and **kwargs?",
    keywords: ["args", "kwargs", "star", "variadic", "arguments", "parameters", "unpack"],
    answer:
      "*args collects extra positional arguments into a tuple, **kwargs collects extra keyword arguments into a dict. The names are convention only — the * and ** do the work.",
    code: 'def report(label, *args, **kwargs):\n    print(label, args, kwargs)\n\nreport("scores", 1, 2, unit="points")',
  },
  {
    id: "x-default-args",
    topic: "common errors",
    question: "Why is a mutable default argument dangerous?",
    keywords: ["default", "mutable", "argument", "list", "shared", "gotcha", "none"],
    answer:
      "Default values are created once when the function is defined, so a default list or dict is shared by every call. Use None as the default and build a fresh object inside the function.",
    code: "def add(item, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(item)\n    return bucket",
  },
  {
    id: "x-scope",
    topic: "functions",
    question: "How does variable scope work, and what do global and nonlocal do?",
    keywords: ["scope", "global", "nonlocal", "local", "variable", "shadow", "namespace"],
    answer:
      "Python looks up names locally, then in enclosing functions, then globally, then in built-ins. Assigning inside a function creates a local name unless you declare global (module level) or nonlocal (enclosing function).",
    code: "count = 0\n\ndef bump():\n    global count\n    count += 1\n\nbump()\nprint(count)",
  },
  {
    id: "x-return-multiple",
    topic: "functions",
    question: "Can a function return more than one value?",
    keywords: ["return", "multiple", "several", "tuple", "values", "unpack"],
    answer:
      "Return a tuple — writing several values after return builds one automatically, and the caller can unpack them into separate names.",
    code: "def stats(nums):\n    return min(nums), max(nums), sum(nums) / len(nums)\n\nlow, high, mean = stats([2, 4, 9])\nprint(low, high, mean)",
  },
  {
    id: "x-recursion",
    topic: "functions",
    question: "How does recursion work in Python?",
    keywords: ["recursion", "recursive", "factorial", "fibonacci", "base", "case", "depth"],
    answer:
      "A recursive function calls itself and needs a base case that stops the chain. Python's default recursion limit is about 1000 frames, so deep problems are better solved with a loop or with caching via functools.lru_cache.",
    code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
  },
  {
    id: "x-map-filter",
    topic: "functions",
    question: "How do map(), filter() and reduce() work?",
    keywords: ["map", "filter", "reduce", "functional", "lambda", "apply", "transform"],
    answer:
      "map() applies a function to every item, filter() keeps items where the function is true, and functools.reduce() folds a sequence into a single value. Both map and filter are lazy — wrap them in list(). A comprehension is usually clearer.",
    code: "from functools import reduce\n\nnums = [1, 2, 3, 4]\nprint(list(map(lambda n: n * n, nums)))\nprint(list(filter(lambda n: n % 2 == 0, nums)))\nprint(reduce(lambda a, b: a + b, nums))",
  },
  {
    id: "x-decorator",
    topic: "functions",
    question: "What is a decorator and how do I write one?",
    keywords: ["decorator", "wrapper", "at", "wraps", "functools", "timing", "modify"],
    answer:
      "A decorator is a function that takes a function and returns a replacement, applied with @name above a def. Use functools.wraps so the wrapped function keeps its name and docstring.",
    code: 'import functools\n\ndef shout(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet(name):\n    return f"hi {name}"\n\nprint(greet("ada"))',
  },
  {
    id: "x-generator",
    topic: "functions",
    question: "What is a generator and what does yield do?",
    keywords: ["generator", "yield", "lazy", "iterator", "memory", "stream", "next"],
    answer:
      "A function with yield returns a generator: it produces values one at a time and remembers where it stopped, so it uses almost no memory for long sequences. A generator expression is the same idea in comprehension form with parentheses.",
    code: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))\nsquares = (n * n for n in range(5))\nprint(sum(squares))",
  },
  {
    id: "x-iterator",
    topic: "loops",
    question: "What is the difference between an iterable and an iterator?",
    keywords: ["iterable", "iterator", "iter", "next", "stopiteration", "protocol"],
    answer:
      "An iterable can produce an iterator via iter(); an iterator produces the next value via next() and raises StopIteration when exhausted. A for loop does both steps for you.",
    code: 'it = iter([1, 2])\nprint(next(it), next(it))',
  },
  {
    id: "x-typehints",
    topic: "python basics",
    question: "How do type hints work?",
    keywords: ["type", "hint", "annotation", "typing", "mypy", "signature", "optional"],
    answer:
      "Annotate parameters and return values for readability and tooling. Python does not enforce them at runtime; a checker like mypy does. Use list[int], dict[str, int] and X | None on modern versions.",
    code: "def average(values: list[float]) -> float:\n    return sum(values) / len(values)",
  },
  {
    id: "x-lru-cache",
    topic: "standard library",
    question: "How do I cache the result of a slow function?",
    keywords: ["cache", "memo", "memoize", "lru", "functools", "speed", "repeat"],
    answer:
      "Decorate it with functools.lru_cache (or functools.cache). Repeated calls with the same arguments return the stored result instead of recomputing. Arguments must be hashable.",
    code: "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(50))",
  },

  // ---------- OOP ----------
  {
    id: "x-inheritance",
    topic: "oop",
    question: "How does inheritance and super() work?",
    keywords: ["inheritance", "inherit", "super", "subclass", "parent", "base", "override"],
    answer:
      "List the parent in parentheses after the class name; the child gets its attributes and methods and can override them. Call super().__init__() to run the parent's setup.",
    code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "woof"\n\nprint(Dog("Rex").speak())',
  },
  {
    id: "x-dunder",
    topic: "oop",
    question: "What are dunder methods like __str__ and __repr__?",
    keywords: ["dunder", "magic", "str", "repr", "eq", "len", "special", "method"],
    answer:
      "Double-underscore methods hook your class into Python's syntax: __init__ builds, __str__ gives friendly text, __repr__ gives debugging text, __eq__ powers ==, __len__ powers len() and __iter__ makes it loopable.",
    code: 'class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f"Point({self.x}, {self.y})"\n\nprint(Point(1, 2))',
  },
  {
    id: "x-classmethod",
    topic: "oop",
    question: "What is the difference between an instance, class and static method?",
    keywords: ["classmethod", "staticmethod", "instance", "cls", "self", "decorator", "method"],
    answer:
      "An instance method takes self and works on one object. A @classmethod takes cls and often builds alternative constructors. A @staticmethod takes neither and is just a related helper living in the class.",
    code: 'class Temp:\n    def __init__(self, c):\n        self.c = c\n    @classmethod\n    def from_f(cls, f):\n        return cls((f - 32) / 1.8)\n    @staticmethod\n    def unit():\n        return "celsius"\n\nprint(Temp.from_f(212).c, Temp.unit())',
  },
  {
    id: "x-property",
    topic: "oop",
    question: "How do properties and private attributes work?",
    keywords: ["property", "getter", "setter", "private", "underscore", "encapsulation", "attribute"],
    answer:
      "@property exposes a method as an attribute, and @name.setter validates writes. Python has no real private members: a single underscore means internal by convention, and a double underscore triggers name mangling.",
    code: "class Account:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n    @balance.setter\n    def balance(self, value):\n        if value < 0:\n            raise ValueError(\"negative balance\")\n        self._balance = value",
  },
  {
    id: "x-dataclass",
    topic: "oop",
    question: "What is a dataclass?",
    keywords: ["dataclass", "boilerplate", "init", "repr", "record", "struct", "frozen"],
    answer:
      "@dataclass writes __init__, __repr__ and __eq__ for you from annotated fields. frozen=True makes instances immutable, and field(default_factory=list) gives safe mutable defaults.",
    code: 'from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int = 0\n\nprint(Book("Fluent Python", 800))',
  },
  {
    id: "x-polymorphism",
    topic: "oop",
    question: "What are polymorphism and abstract base classes?",
    keywords: ["polymorphism", "abstract", "abc", "interface", "duck", "typing", "override"],
    answer:
      "Polymorphism means different classes answer the same call in their own way, so calling code does not care about the type — Python leans on duck typing for this. Use abc.ABC with @abstractmethod when subclasses must implement a method.",
    code: 'from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        ...\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nprint(Square(3).area())',
  },

  // ---------- errors ----------
  {
    id: "x-raise-custom",
    topic: "exception handling",
    question: "How do I raise an error or define my own exception?",
    keywords: ["raise", "custom", "exception", "error", "class", "throw", "message"],
    answer:
      "raise an exception instance with a helpful message. For your own type, subclass Exception (or a closer built-in) so callers can catch it specifically.",
    code: 'class TooColdError(Exception):\n    pass\n\ndef check(temp):\n    if temp < -50:\n        raise TooColdError(f"{temp} is out of range")\n\ntry:\n    check(-80)\nexcept TooColdError as err:\n    print("caught:", err)',
  },
  {
    id: "x-catch-specific",
    topic: "exception handling",
    question: "Why should I avoid a bare except?",
    keywords: ["bare", "except", "broad", "catch", "exception", "silent", "traceback"],
    answer:
      "A bare except also swallows KeyboardInterrupt and real bugs, hiding the cause. Catch the specific exceptions you expect, keep the try block small, and log or re-raise anything unexpected.",
    code: 'try:\n    value = int("abc")\nexcept ValueError as err:\n    print("bad number:", err)',
  },
  {
    id: "x-assert",
    topic: "exception handling",
    question: "What does assert do?",
    keywords: ["assert", "assertion", "check", "invariant", "debug", "test"],
    answer:
      "assert raises AssertionError when a condition is false, which is handy for internal sanity checks and tests. It is stripped when Python runs with -O, so never use it to validate user input or enforce security.",
    code: "def average(nums):\n    assert nums, \"nums must not be empty\"\n    return sum(nums) / len(nums)",
  },
  {
    id: "x-traceback",
    topic: "common errors",
    question: "How do I read a traceback?",
    keywords: ["traceback", "stack", "trace", "error", "read", "debug", "line"],
    answer:
      "Read it bottom-up: the last line names the exception and message, and the frames above show the call chain with file and line numbers. The lowest frame in your own code is usually where to start looking.",
  },
  {
    id: "x-typeerror",
    topic: "common errors",
    question: "What causes TypeError and how do I fix it?",
    keywords: ["typeerror", "unsupported", "operand", "concatenate", "callable", "argument"],
    answer:
      "TypeError means an operation got the wrong kind of value — adding a string to a number, calling something that is not a function, or passing the wrong argument count. Print the types involved, then convert or fix the call.",
    code: 'age = "30"\nprint(int(age) + 1)  # not "30" + 1',
  },
  {
    id: "x-attributeerror",
    topic: "common errors",
    question: "What does AttributeError: 'NoneType' object has no attribute mean?",
    keywords: ["attributeerror", "nonetype", "none", "attribute", "null", "return"],
    answer:
      "Something you expected to be an object is None — often because a function ended without returning, or a method like list.sort() returns None. Trace back to where the value is produced and return the object you need.",
    code: "nums = [3, 1]\nnums.sort()          # returns None\nprint(nums)          # use the list itself\nprint(sorted([3, 1]))  # or sorted()",
  },
  {
    id: "x-modify-while-iterating",
    topic: "common errors",
    question: "Why is my list wrong when I remove items while looping?",
    keywords: ["remove", "loop", "modify", "iterate", "skip", "mutate", "while"],
    answer:
      "Deleting from a list you are iterating shifts the remaining items, so entries get skipped. Build a new list with a comprehension, or loop over a copy.",
    code: "nums = [1, 2, 2, 3]\nnums = [n for n in nums if n != 2]\nprint(nums)",
  },
  {
    id: "x-logging",
    topic: "standard library",
    question: "How do I use logging instead of print?",
    keywords: ["logging", "logger", "log", "debug", "info", "warning", "level", "print"],
    answer:
      "Configure logging once, then log at the right level: debug, info, warning, error, critical. Unlike print, you can change verbosity, add timestamps and send output to a file without editing every call.",
    code: 'import logging\n\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")\nlogging.info("started")\nlogging.warning("low disk space")',
  },

  // ---------- files, data formats ----------
  {
    id: "x-json",
    topic: "file handling",
    question: "How do I read and write JSON?",
    keywords: ["json", "dumps", "loads", "dump", "load", "serialize", "api", "dictionary"],
    answer:
      "json.load()/json.dump() work with files, json.loads()/json.dumps() with strings. dumps takes indent= for readable output. Python dicts and lists map straight onto JSON objects and arrays.",
    code: 'import json\n\ndata = {"name": "Ada", "tags": ["math"]}\nwith open("out.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, indent=2)\n\nwith open("out.json", encoding="utf-8") as f:\n    print(json.load(f))',
  },
  {
    id: "x-append-file",
    topic: "file handling",
    question: "What do the file modes r, w, a and b mean?",
    keywords: ["mode", "append", "write", "read", "binary", "open", "overwrite", "encoding"],
    answer:
      'r reads (the default), w writes and truncates the file, a appends, x fails if the file exists, and adding b works in bytes. Always pass encoding="utf-8" for text, and prefer with so the file closes itself.',
    code: 'with open("log.txt", "a", encoding="utf-8") as f:\n    f.write("another line\\n")',
  },
  {
    id: "x-pathlib",
    topic: "file handling",
    question: "How do I work with paths and check if a file exists?",
    keywords: ["path", "pathlib", "exists", "os", "join", "directory", "folder", "listdir"],
    answer:
      "pathlib.Path is the modern way: / joins parts, .exists() checks presence, .mkdir(parents=True, exist_ok=True) creates folders, .glob() lists matches, and .read_text()/.write_text() handle small files.",
    code: 'from pathlib import Path\n\np = Path("data") / "notes.txt"\np.parent.mkdir(parents=True, exist_ok=True)\np.write_text("hello", encoding="utf-8")\nprint(p.exists(), list(Path("data").glob("*.txt")))',
  },
  {
    id: "x-context-manager",
    topic: "file handling",
    question: "What is a context manager and how do I write one?",
    keywords: ["context", "manager", "with", "enter", "exit", "contextlib", "cleanup", "close"],
    answer:
      "with sets something up and guarantees cleanup even if an error is raised. Any object with __enter__ and __exit__ works, and contextlib.contextmanager turns a generator into one.",
    code: 'from contextlib import contextmanager\n\n@contextmanager\ndef banner(name):\n    print(f"-- {name} start")\n    try:\n        yield\n    finally:\n        print(f"-- {name} end")\n\nwith banner("job"):\n    print("working")',
  },
  {
    id: "x-datetime",
    topic: "standard library",
    question: "How do I work with dates and times?",
    keywords: ["date", "time", "datetime", "now", "strftime", "strptime", "timedelta", "format"],
    answer:
      "datetime.now() gives the current moment, strftime() formats it as text, strptime() parses text into a datetime, and timedelta does date arithmetic. time.sleep() pauses a program.",
    code: 'from datetime import datetime, timedelta\n\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))\nprint((now + timedelta(days=7)).date())\nprint(datetime.strptime("2026-01-31", "%Y-%m-%d"))',
  },
  {
    id: "x-regex",
    topic: "standard library",
    question: "How do I use regular expressions in Python?",
    keywords: ["regex", "re", "pattern", "search", "match", "findall", "sub", "group"],
    answer:
      "The re module compiles patterns: search() finds the first match, findall() returns all of them, sub() replaces, and groups capture parts. Use raw strings (r\"...\") so backslashes stay intact.",
    code: 'import re\n\ntext = "order 12 and order 345"\nprint(re.findall(r"\\d+", text))\nprint(re.sub(r"\\d+", "#", text))',
  },
  {
    id: "x-itertools",
    topic: "standard library",
    question: "What is itertools good for?",
    keywords: ["itertools", "combinations", "permutations", "product", "groupby", "cycle", "islice"],
    answer:
      "itertools builds lazy iterators: combinations() and permutations() for selections, product() for nested loops, groupby() for runs of equal items, cycle() and islice() for endless or partial streams.",
    code: 'from itertools import combinations, product\n\nprint(list(combinations("abc", 2)))\nprint(list(product([1, 2], "xy")))',
  },

  // ---------- environment and tooling ----------
  {
    id: "x-pip",
    topic: "modules and imports",
    question: "How do I install a package with pip?",
    keywords: ["pip", "install", "package", "library", "requirements", "upgrade", "pypi"],
    answer:
      "Run python3 -m pip install name inside your virtual environment. Freeze the versions you use into requirements.txt so the project installs the same way elsewhere.",
    code: "python3 -m pip install requests\npython3 -m pip freeze > requirements.txt\npython3 -m pip install -r requirements.txt",
  },
  {
    id: "x-venv",
    topic: "modules and imports",
    question: "What is a virtual environment and how do I create one?",
    keywords: ["venv", "virtual", "environment", "activate", "isolate", "conda", "dependency"],
    answer:
      "A virtual environment keeps one project's packages separate from the system Python, so versions never clash. Create it with the venv module and activate it before installing anything.",
    code: "python3 -m venv .venv\nsource .venv/bin/activate     # macOS/Linux\n.venv\\Scripts\\activate       # Windows",
  },
  {
    id: "x-main-guard",
    topic: "modules and imports",
    question: 'What does if __name__ == "__main__" do?',
    keywords: ["main", "name", "guard", "script", "import", "entry", "module"],
    answer:
      '__name__ is "__main__" only when the file is run directly, and the module name when it is imported. The guard lets a file be both a runnable script and an importable module.',
    code: 'def main():\n    print("running directly")\n\nif __name__ == "__main__":\n    main()',
  },
  {
    id: "x-argv",
    topic: "modules and imports",
    question: "How do I read command line arguments?",
    keywords: ["argv", "argparse", "command", "line", "argument", "cli", "sys", "flag"],
    answer:
      "sys.argv holds the raw arguments, with the script name first. For anything beyond one or two values use argparse: it parses flags, converts types and prints help for free.",
    code: 'import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument("--count", type=int, default=1)\nargs = parser.parse_args()\nprint(args.count)',
  },
  {
    id: "x-env-vars",
    topic: "modules and imports",
    question: "How do I read environment variables?",
    keywords: ["environment", "variable", "env", "getenv", "os", "secret", "config"],
    answer:
      "os.environ is a dict of the process environment; os.getenv(\"NAME\", default) reads one safely. Keep secrets in the environment rather than in your source code.",
    code: 'import os\n\nprint(os.getenv("HOME", "unknown"))',
  },
  {
    id: "x-unittest",
    topic: "python basics",
    question: "How do I write tests for my Python code?",
    keywords: ["test", "unittest", "pytest", "assert", "testcase", "coverage", "check"],
    answer:
      "The standard library has unittest: subclass TestCase and use the assert methods. pytest is a popular third-party option where plain assert statements are enough. Keep tests in files named test_*.py.",
    code: 'import unittest\n\ndef double(n):\n    return n * 2\n\nclass TestDouble(unittest.TestCase):\n    def test_double(self):\n        self.assertEqual(double(3), 6)\n\nif __name__ == "__main__":\n    unittest.main()',
  },
  {
    id: "x-pep8",
    topic: "python basics",
    question: "What is PEP 8 and how should I style my code?",
    keywords: ["pep8", "style", "convention", "naming", "format", "black", "lint", "indent"],
    answer:
      "PEP 8 is the style guide: four-space indents, snake_case for functions and variables, CapWords for classes, UPPER_CASE for constants, and lines around 79–88 characters. Formatters like black and linters like ruff apply it automatically.",
  },
  {
    id: "x-python2-3",
    topic: "python basics",
    question: "What is the difference between Python 2 and Python 3?",
    keywords: ["python2", "python3", "version", "difference", "print", "legacy", "unicode"],
    answer:
      "Python 3 made print a function, strings Unicode by default, / true division, and range lazy. Python 2 reached end of life in 2020, so write all new code in Python 3.",
  },
  {
    id: "x-interpreted",
    topic: "python basics",
    question: "Is Python compiled or interpreted, and what is the GIL?",
    keywords: ["interpreted", "compiled", "bytecode", "gil", "cpython", "pyc", "performance"],
    answer:
      "CPython compiles your source to bytecode (.pyc) and an interpreter runs it. The Global Interpreter Lock lets only one thread execute Python bytecode at a time, so use threads for I/O waiting and processes (multiprocessing) for CPU-heavy work.",
  },
  {
    id: "x-mutable-immutable",
    topic: "data types",
    question: "Which Python types are mutable and which are immutable?",
    keywords: ["mutable", "immutable", "change", "hashable", "tuple", "frozenset", "type"],
    answer:
      "Lists, dicts, sets and most objects are mutable. Numbers, strings, tuples, frozensets and booleans are immutable, which is why only immutable values can be dictionary keys or set members.",
    code: 'nums = [1, 2]\nnums[0] = 9        # fine\nname = "ada"\n# name[0] = "A"    # TypeError',
  },
  {
    id: "x-memory",
    topic: "python basics",
    question: "How does Python manage memory and garbage collection?",
    keywords: ["memory", "garbage", "collection", "reference", "count", "del", "id", "leak"],
    answer:
      "CPython frees an object when its reference count drops to zero, and a cycle collector cleans up groups that reference each other. del removes a name, not necessarily the object.",
    code: "import sys\n\nvalues = [1, 2, 3]\nprint(sys.getrefcount(values))",
  },

  // ---------- concurrency and outside world ----------
  {
    id: "x-threading",
    topic: "concurrency",
    question: "How do I run things in parallel with threads or processes?",
    keywords: ["thread", "threading", "process", "multiprocessing", "parallel", "concurrent", "pool", "worker"],
    answer:
      "concurrent.futures is the friendly front door: ThreadPoolExecutor for I/O-bound work like downloads, ProcessPoolExecutor for CPU-bound work that the GIL would otherwise serialise.",
    code: "from concurrent.futures import ThreadPoolExecutor\n\ndef work(n):\n    return n * n\n\nwith ThreadPoolExecutor(max_workers=4) as pool:\n    print(list(pool.map(work, range(5))))",
  },
  {
    id: "x-asyncio",
    topic: "concurrency",
    question: "What are async and await used for?",
    keywords: ["async", "await", "asyncio", "coroutine", "gather", "event", "loop", "concurrent"],
    answer:
      "async def defines a coroutine and await suspends it while waiting, letting one thread juggle many I/O operations. asyncio.run() starts the loop and asyncio.gather() runs coroutines together.",
    code: 'import asyncio\n\nasync def tick(n):\n    await asyncio.sleep(0.1)\n    return n\n\nasync def main():\n    print(await asyncio.gather(tick(1), tick(2)))\n\nasyncio.run(main())',
  },
  {
    id: "x-requests",
    topic: "modules and imports",
    question: "How do I call an API or fetch a web page?",
    keywords: ["request", "requests", "http", "api", "get", "post", "url", "urllib", "json"],
    answer:
      "The requests library is the usual choice: requests.get(url) then .json() or .text, and raise_for_status() to fail loudly on errors. urllib.request in the standard library works without installing anything.",
    code: 'import requests\n\nresp = requests.get("https://api.github.com", timeout=10)\nresp.raise_for_status()\nprint(resp.json()["current_user_url"])',
  },
  {
    id: "x-csv",
    topic: "file handling",
    question: "How do I read and write CSV files?",
    keywords: ["csv", "reader", "writer", "dictreader", "spreadsheet", "row", "column", "excel"],
    answer:
      'Use the csv module with newline="" on the file. DictReader gives each row as a dict keyed by the header, and DictWriter writes rows from dicts.',
    code: 'import csv\n\nwith open("people.csv", newline="", encoding="utf-8") as f:\n    for row in csv.DictReader(f):\n        print(row["name"])',
  },
  {
    id: "x-numpy-pandas",
    topic: "modules and imports",
    question: "What are NumPy and pandas used for?",
    keywords: ["numpy", "pandas", "dataframe", "array", "data", "science", "csv", "analysis"],
    answer:
      "NumPy adds fast fixed-type arrays and vectorised maths. pandas builds DataFrames on top for tabular work — reading CSV or Excel, filtering, grouping and summarising. Install them with pip; neither ships with Python.",
    code: 'import pandas as pd\n\ndf = pd.read_csv("people.csv")\nprint(df.head())\nprint(df.groupby("city")["age"].mean())',
  },
  {
    id: "x-speed",
    topic: "python basics",
    question: "How do I make my Python code faster?",
    keywords: ["fast", "faster", "slow", "performance", "optimize", "profile", "timeit", "speed"],
    answer:
      "Measure first with timeit or cProfile, then fix the real hotspot: pick better data structures (sets and dicts for lookups), avoid work inside loops, use comprehensions and built-ins, cache repeated results, and reach for NumPy on heavy numeric work.",
    code: 'import timeit\n\nprint(timeit.timeit("sum(range(1000))", number=10000))',
  },
];
