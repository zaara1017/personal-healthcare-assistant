import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendChatMessage } from "../services/aiService";

function HealthChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 I'm your Personal Healthcare Assistant. You can ask me general health-related questions, and I'll provide helpful information.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send previous conversation to the backend
      const history = messages
        .filter(
          (msg) => msg.role === "user" || msg.role === "assistant"
        )
        .map((msg) => ({
          role: msg.role,
          text: msg.text,
        }));

      const data = await sendChatMessage(userMessage.text, history);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
          disclaimer: data.disclaimer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      let errorMessage =
        "Sorry, I couldn't process your request right now. Please try again.";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === "ERR_NETWORK") {
        errorMessage =
          "Unable to connect to the healthcare assistant. Please make sure the backend server is running.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Enter = Send
    // Shift + Enter = New line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared. How can I help you?",
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm p-5 border-b">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              AI Health Assistant
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Your personal assistant for general health information
            </p>
          </div>

          <button
            onClick={clearChat}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            Clear Chat
          </button>

        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-xs text-blue-700">
            ℹ️ This assistant provides general health information only.
            It does not diagnose conditions or replace professional medical
            advice.
          </p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white shadow-sm">

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="p-5 border-b">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              You can ask me:
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "How can I improve my sleep?",
                "How much water should I drink daily?",
                "What are some healthy eating habits?",
                "How can I stay physically active?",
                "Can you explain my medication schedule?",
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="text-sm border border-blue-200 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="h-[55vh] overflow-y-auto p-5 space-y-4">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >

                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>

                {/* Disclaimer */}
                {msg.disclaimer && (
                  <p className="text-[10px] text-gray-500 mt-3 italic border-t pt-2">
                    {msg.disclaimer}
                  </p>
                )}

              </div>
            </div>
          ))}

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 rounded-xl px-4 py-3">

                <div className="flex items-center gap-2">
                  <span>Thinking</span>

                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>

                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>

                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </span>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Input Area */}
        <div className="border-t p-4">

          <div className="flex gap-2">

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about your health..."
              rows="2"
              className="flex-1 border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

          <p className="text-[11px] text-gray-400 mt-2">
            Press Enter to send • Shift + Enter for a new line
          </p>

        </div>

      </div>

    </div>
  );
}

export default HealthChat;