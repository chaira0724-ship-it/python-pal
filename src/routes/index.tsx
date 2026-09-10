import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";

import { CodeBlock } from "@/components/CodeBlock";
import { askPython } from "@/lib/ask.functions";
import { KB_ENTRY_COUNT, SAMPLE_QUESTIONS } from "@/lib/kb-meta";
import type { MatchResult } from "@/lib/nlp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pythology — Ask Python Questions, Get Indexed Answers" },
      {
        name: "description",
        content:
          "A quiet notebook of hand-indexed Python answers. Ask about lists, dictionaries, loops, functions, OOP, files, and errors — no sign-up needed.",
      },
      { property: "og:title", content: "Pythology — Ask Python Questions, Get Indexed Answers" },
      {
        property: "og:description",
        content:
          "Ask a Python question in plain language and get a matched answer from a curated knowledge base, with topic and confidence.",
      },
    ],
  }),
  component: Chat,
});

type Message =
  | { id: string; role: "user"; text: string; time: string }
  | {
      id: string;
      role: "bot";
      text: string;
      time: string;
      topic?: string;
      confidence?: number;
      code?: string;
      matched: boolean;
      error?: boolean;
      suggestions?: string[];
    };

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "Ask me a Python question in plain language. I look it up in a fixed notebook of answers and tell you how sure the match is.",
  time: clock(),
  matched: true,
};

function clock() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Chat() {
  const ask = useServerFn(askPython);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending]);

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || pending) return;

      setDraft("");
      setPending(true);
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: "user", text: question, time: clock() },
      ]);

      try {
        const result: MatchResult = await ask({ data: { question } });
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            role: "bot",
            text: result.answer,
            time: clock(),
            matched: result.matched,
            confidence: result.confidence,
            ...(result.topic ? { topic: result.topic } : {}),
            ...(result.code ? { code: result.code } : {}),
            ...(result.suggestions ? { suggestions: result.suggestions } : {}),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: "bot",
            text: "I couldn't reach the notebook just now. Check your connection and send the question again.",
            time: clock(),
            matched: false,
            error: true,
          },
        ]);
      } finally {
        setPending(false);
        inputRef.current?.focus();
      }
    },
    [ask, pending],
  );

  const exchanges = messages.filter((m) => m.role === "user").length;

  return (
    <div className="min-h-screen bg-paper text-ink font-body selection:bg-utterance/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-7 sm:py-10">
        <header className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="grid place-items-center size-7 rounded-md bg-ink text-paper font-mono text-[11px] font-medium">
                Py
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-soft">
                study desk · 04
              </span>
            </div>
            <h1 className="font-display font-semibold text-[1.7rem] sm:text-4xl leading-none text-balance">
              Pythology
            </h1>
            <p className="mt-2 text-sm text-muted text-pretty">
              A quiet notebook of hand-indexed Python answers.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-soft">
              retrieval · no magic
            </span>
            <span className="font-mono text-[11px] text-soft">kb · {KB_ENTRY_COUNT} entries</span>
          </div>
        </header>

        <section className="bg-surface ring-1 ring-black/5 rounded-[18px] overflow-hidden">
          <div className="px-4 sm:px-7 py-4 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                transcript
              </span>
            </div>
            <span className="font-mono text-[11px] text-soft">
              {exchanges} {exchanges === 1 ? "exchange" : "exchanges"}
            </span>
          </div>

          <div className="px-4 sm:px-7 py-5 sm:py-7 space-y-5 max-h-[62vh] overflow-y-auto">
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end msg-in">
                  <div className="max-w-[82%]">
                    <div className="rounded-[14px] bg-ink text-paper px-4 py-3">
                      <p className="text-[15px] sm:text-base leading-relaxed text-pretty">
                        {message.text}
                      </p>
                    </div>
                    <div className="mt-1.5 text-right font-mono text-[10px] text-soft">
                      you · {message.time}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start msg-in">
                  <div className="max-w-[92%] w-full">
                    <div
                      className={`rounded-[16px] ring-1 ring-black/5 p-4 sm:p-5 ${
                        message.matched ? "bg-surface" : "bg-utterance/30"
                      }`}
                    >
                      {message.id !== "welcome" ? (
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.14em] rounded px-2 py-0.5 ${
                              message.matched
                                ? "text-brand bg-brand/10"
                                : "text-muted bg-ink/[0.08]"
                            }`}
                          >
                            {message.error
                              ? "notebook unreachable"
                              : message.matched
                                ? message.topic
                                : "no confident match"}
                          </span>
                          {typeof message.confidence === "number" ? (
                            <span className="font-mono text-[10px] text-soft">
                              match {Math.round(message.confidence * 100)}%
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      <p className="text-[15px] sm:text-base leading-relaxed text-pretty">
                        {message.text}
                      </p>

                      {message.code ? <CodeBlock code={message.code} /> : null}

                      {message.suggestions?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => void send(suggestion)}
                              className="font-mono text-[11px] text-ink bg-surface ring-1 ring-black/5 rounded-full px-3 py-1.5 hover:bg-utterance/40 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      {message.matched && typeof message.confidence === "number" ? (
                        <div className="mt-3">
                          <div className="h-1 rounded-full bg-line overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand"
                              style={{ width: `${Math.round(message.confidence * 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ),
            )}

            {pending ? (
              <div className="flex justify-start">
                <div className="max-w-[82%]">
                  <div className="rounded-[14px] bg-surface ring-1 ring-black/5 px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="typing-dot size-1.5 rounded-full bg-soft" />
                      <span
                        className="typing-dot size-1.5 rounded-full bg-soft"
                        style={{ animationDelay: "0.18s" }}
                      />
                      <span
                        className="typing-dot size-1.5 rounded-full bg-soft"
                        style={{ animationDelay: "0.36s" }}
                      />
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-soft">
                        consulting the notebook
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} />
          </div>

          <div className="px-4 sm:px-7 pt-4 pb-5 border-t border-line">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-soft">
                try asking
              </span>
              <button
                onClick={() => {
                  setMessages([{ ...WELCOME, time: clock() }]);
                  inputRef.current?.focus();
                }}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors"
              >
                clear chat
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUESTIONS.map((sample) => (
                <button
                  key={sample}
                  onClick={() => void send(sample)}
                  className="font-mono text-[12px] text-ink bg-surface ring-1 ring-black/5 rounded-full px-3 py-1.5 hover:-translate-y-0.5 hover:bg-utterance/40 transition-transform"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
            className="px-4 sm:px-7 py-4 bg-paper/60 border-t border-line"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center rounded-full bg-surface ring-1 ring-black/[0.08] focus-within:ring-brand/40 px-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask a Python question…"
                  aria-label="Ask a Python question"
                  className="w-full bg-transparent py-3 text-[15px] text-ink placeholder:text-soft outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={pending || draft.trim().length === 0}
                className="shrink-0 inline-flex items-center gap-1.5 bg-brand text-paper font-medium text-sm rounded-full py-2 px-4 ring-1 ring-brand/40 hover:bg-brand/90 transition-colors disabled:opacity-45"
              >
                send
                <span className="font-mono text-[13px] leading-none">→</span>
              </button>
            </div>
          </form>
        </section>

        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-soft">
          retrieval over a fixed knowledge base · no answers invented
        </p>
      </div>
    </div>
  );
}
