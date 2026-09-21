'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { faqBank, suggestedQuestions, type FaqEntry } from '@/data/faqBank';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

const FALLBACK =
  "I don't have an answer for that one yet — try asking about Jett's work, school, projects, or how to get in touch. For anything else, email jett@insurancecenterut.com.";

const INTRO =
  "Hey, I'm a little Q&A bot trained on this site. Ask me about Jett's work, background, projects, or how to reach him.";

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findAnswer(input: string): FaqEntry | null {
  const normalized = normalize(input);
  if (!normalized) return null;

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faqBank) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (!normalizedKeyword) continue;
      if (normalized.includes(normalizedKeyword)) {
        // Longer keyword matches are stronger signals than single short words.
        score += normalizedKeyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0 ? best : null;
}

let messageCounter = 0;
function nextId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: nextId(), role: 'bot', text: INTRO }]);
  const [input, setInput] = useState('');
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, reduce]);

  const respondTo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: nextId(), role: 'user', text: trimmed };
    const match = findAnswer(trimmed);
    const botMessage: Message = {
      id: nextId(),
      role: 'bot',
      text: match ? match.answer : FALLBACK,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    respondTo(input);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-on-primary shadow-premium flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          {open ? 'close' : 'chat'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: reduce ? 0.15 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[70vh] bg-surface-container-highest border border-white/[0.08] rounded-[1.25rem] shadow-premium flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Chat about Jett"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-surface-container-low">
              <div>
                <p className="font-headline italic text-xl text-primary leading-none">Ask about Jett</p>
                <p className="font-label text-[10px] uppercase tracking-luxe text-outline mt-1">
                  Q&amp;A bot &middot; no AI, just answers
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
              >
                close
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`text-sm leading-relaxed rounded-[0.9rem] px-4 py-2.5 max-w-[85%] ${
                    m.role === 'bot'
                      ? 'bg-surface-container text-on-surface-variant mr-auto rounded-tl-sm'
                      : 'bg-primary-container text-on-primary-container ml-auto rounded-tr-sm'
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {/* Suggested questions, shown until the visitor has asked something */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestedQuestions.map((id) => {
                    const entry = faqBank.find((f) => f.id === id);
                    if (!entry) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => respondTo(entry.question)}
                        className="font-label text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-colors"
                      >
                        {entry.question}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/[0.08]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                aria-label="Type a question"
                className="flex-1 bg-surface-container rounded-md px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-md bg-primary text-on-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
