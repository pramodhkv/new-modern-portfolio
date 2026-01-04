import React, { useState, useRef, useEffect } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import MessageBubble from "../MessageBubble";
import TypingIndicator from "../TypingIndicator";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RATE_LIMIT = 20;
const SESSION_ID_KEY = "ai-chat-session-id";
const MESSAGES_KEY = "ai-chat-messages";
const RATE_LIMIT_KEY = "ai-chat-rate-limit";

const ChatModal: React.FC<IChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(RATE_LIMIT);
  const [error, setError] = useState<string | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Handle animation when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after mounting
      setTimeout(() => setShouldAnimate(true), 10);
    } else {
      setShouldAnimate(false);
    }
  }, [isOpen]);

  // Generate or retrieve session ID
  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);
    }
    return sessionId;
  };

  // Load messages from sessionStorage on mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem(MESSAGES_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }

    // Load rate limit from localStorage
    const savedRateLimit = localStorage.getItem(RATE_LIMIT_KEY);
    if (savedRateLimit) {
      try {
        const { count, resetAt } = JSON.parse(savedRateLimit);
        const now = Date.now();
        if (now < resetAt) {
          setRemaining(RATE_LIMIT - count);
        } else {
          // Reset if expired
          localStorage.removeItem(RATE_LIMIT_KEY);
          setRemaining(RATE_LIMIT);
        }
      } catch (e) {
        console.error("Failed to parse rate limit", e);
      }
    }
  }, []);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const updateRateLimit = (newRemaining: number) => {
    setRemaining(newRemaining);
    // Store the remaining count directly from the backend
    const count = RATE_LIMIT - newRemaining;
    const resetAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ count, resetAt }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || remaining <= 0) return;

    const userMessage: IMessage = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: getSessionId(),
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      // Check if response is ok before parsing
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Failed to get response";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Check if response has content
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "API returned invalid response format. Please check if the API endpoint is configured correctly."
        );
      }

      const data = await response.json();

      if (!data.message) {
        throw new Error("No message received from AI");
      }

      const assistantMessage: IMessage = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (typeof data.remaining === "number") {
        updateRateLimit(data.remaining);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    sessionStorage.removeItem(MESSAGES_KEY);
    setError(null);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          shouldAnimate ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-body-bg shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          shouldAnimate ? "translate-x-0" : "translate-x-full"
        }`}
        onTransitionEnd={() => {
          if (!isOpen) setShouldRender(false);
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-white font-centra">
                AI Assistant
              </h2>
              <p className="text-xs text-gray-400">
                Questions remaining: {remaining}/{RATE_LIMIT}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close chat"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-lg mb-2">👋 Hi there!</p>
                <p className="text-sm">
                  Ask me anything about my skills, experience, or projects!
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.content}
                isUser={msg.role === "user"}
              />
            ))}

            {isLoading && <TypingIndicator />}

            {error && (
              <div className="p-4 bg-red-900 bg-opacity-30 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-xs text-gray-400 hover:text-white mb-2 transition-colors duration-200"
              >
                Clear conversation
              </button>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  remaining <= 0
                    ? "Rate limit reached. Try again tomorrow!"
                    : "Ask me anything..."
                }
                disabled={isLoading || remaining <= 0}
                rows={2}
                className="flex-1 bg-skill-bg text-white rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-web3-text1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || remaining <= 0}
                className="bg-gradient-to-r from-web3-text1 to-web3-text2 hover:from-web3-text2 hover:to-web3-text1 text-white p-3 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <IoSend className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
