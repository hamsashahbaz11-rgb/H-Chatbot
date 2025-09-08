import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

export function MessageContent({ role, content, isStreaming = false }) {
  const isUser = role === "user";
 

  return (
    <div className={`rounded-lg px-4 py-3 ${
      isUser
        ? "bg-blue-600 text-white"
        : "bg-gray-700 text-gray-100"
    }`}>
      {isUser ? (
        <p className="whitespace-pre-wrap text-sm sm:text-base">{content}</p>
      ) : (
        <div className="prose prose-invert max-w-none text-sm sm:text-base">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ code: CodeBlock }}
          >
             {content}
          </ReactMarkdown>
        </div>
      )}
      
      {isStreaming && (
        <div className="flex items-center mt-2 space-x-1 sm:space-x-2">
          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-green-400"></div>
          <span className="text-sm sm:text-base text-gray-400">AI is typing...</span>
        </div>
      )}
    </div>
  );
}