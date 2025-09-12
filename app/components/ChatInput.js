// components/ChatInput.jsx
import { LoadingIndicator } from "./LoadingIndicator";
import { Send } from "lucide-react";

export function ChatInput({ 
  message, 
  setMessage, 
  onSend, 
  loading, 
  placeholder = "Type your message here... (Press Enter to send, Shift+Enter for new line)" 
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700 p-2 sm:p-4">
      <div className="flex space-x-2 sm:space-x-3 justify-center items-center">
        <div className="flex-1 ">
          <textarea
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            
            className="w-full py-2 sm:py-3 px-2 overflow-auto rounded-lg bg-gray-800 border border-gray-600 text-xs md:text-sm sm:text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none "
            style={{ minHeight: '48px', maxHeight: '400px' }}
            disabled={loading}
          />
        </div>
        <button
          onClick={() => onSend()}
          disabled={loading || !message.trim()}
          className="px-4 sm:px-6 py-2 sm:py-3 h-fit rounded-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base transition-colors"
        >
          {loading ? <LoadingIndicator /> :(<Send className="w-4 h-4" />)}
        </button>
      </div>
            <span className="text-xs text-white text-center flex justify-center items-center mt-1 sm:mt-2">
            <span className="hover:underline">H-Chatbot     </span> Can make mistakes, Check before Implementation.  </span>
    </div>
  );
}