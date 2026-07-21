"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/lib/store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocaleStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            locale === "ar"
              ? "\u0639\u0630\u0631\u0627\u064b\u002c\u062d\u062f\u062b\u062e\u0637\u0623.\u062d\u0627\u0648\u0644\u0645\u0631\u0629\u0623\u062e\u0631\u0649."
              : "Sorry, an error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#c9a96e] text-[#0a0a0a] rounded-full flex items-center justify-center shadow-lg shadow-[#c9a96e]/30 hover:bg-[#d4b87a] transition-colors duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#111111] border-b border-[#2a2a2a] px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#c9a96e]/10 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#c9a96e]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {locale === "ar" ? "\u0645\u0633\u0627\u0639\u062f \u0643\u0644\u0627\u0639\u0648\u062f" : "Claude Assistant"}
                </p>
                <p className="text-gray-500 text-[10px]">
                  {locale === "ar" ? "\u0645\u062a\u0635\u0644 \u0627\u0644\u0622\u0646" : "Online now"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-600 mt-20">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-[#c9a96e]/30" />
                  <p className="text-sm">
                    {locale === "ar"
                      ? "\u0645\u0631\u062d\u0628\u0627\u064b! \u0623\u0646\u0627 \u0645\u0633\u0627\u0639\u062f \u0643\u0644\u0627\u0639\u0648\u062f\u002c \u0627\u0633\u0623\u0644\u0646\u064a \u0623\u064a \u0634\u064a\u0621."
                      : "Hello! I'm Claude. Ask me anything."}
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#c9a96e] text-[#0a0a0a] rounded-br-md"
                        : "bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a] rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#c9a96e] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[#2a2a2a] p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={
                    locale === "ar"
                      ? "\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u062a\u0643\u0647\u0646\u0627\u064b..."
                      : "Type your message..."
                  }
                  className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-[#c9a96e] text-[#0a0a0a] rounded-xl flex items-center justify-center hover:bg-[#d4b87a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
