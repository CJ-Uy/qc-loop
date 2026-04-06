"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { SuggestionChips } from "./SuggestionChips";
import { PageHeader } from "@/components/app/PageHeader";
import { CHAT_TOPICS, DEFAULT_RESPONSE, SUGGESTION_CHIPS } from "@/lib/mock-data/chat-responses";
import type { ChatMessage } from "@/lib/types";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const topic of CHAT_TOPICS) {
    if (topic.keywords.some((kw) => lower.includes(kw))) {
      return topic.response;
    }
  }
  return DEFAULT_RESPONSE;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "init",
      role: "bot",
      content: "👋 Hi! I'm **Kaya**, your QC Loop assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => { return () => { clearTimeout(typingTimer.current); }; }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowChips(false);
    setIsTyping(true);

    typingTimer.current = setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        content: getBotResponse(text),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="QCare"
        subtitle="Kaya — your city assistant"
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="flex gap-2 self-start">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              K
            </div>
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {showChips && (
        <SuggestionChips chips={SUGGESTION_CHIPS} onSelect={sendMessage} />
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-border flex gap-2 items-end bg-background">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Ask Kaya anything…"
          rows={1}
          className="flex-1 resize-none text-sm border border-border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder:text-muted-foreground max-h-24"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity hover:bg-primary/90"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
