// components/MessageActions.jsx
"use client"
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { Copy } from "lucide-react"; // Changed from Folders to Copy for better semantics
import { useState } from "react";

export function MessageActions({ 
  messageIndex, 
  message, 
  onEdit, 
  onDelete, 
  isEditing 
}) {
  const [copied, setCopied] = useState(false);
  if (isEditing) return null;

  const isAIMessage = message.role === "assistant";
  const isUserMessage = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 box-border">
      {/* Copy button - Available for all messages */}
      <button
        onClick={handleCopy}
        className="p-0.5 sm:p-1 rounded hover:bg-slate-500/50 text-white text-xs transition-colors duration-100"
        aria-label="Copy message"
      >
        {copied ? <Check size={12} className="sm:w-3.5 sm:h-3.5" /> : <Copy size={12} className="sm:w-3.5 sm:h-3.5" />}
      </button>
      
      {/* Edit button - Only for user messages */}
      {isUserMessage && (
        <button
          onClick={() => onEdit(messageIndex, message.content)}
          className="p-0.5 sm:p-1 rounded hover:bg-gray-500/50 text-white text-xs transition-colors duration-100"
          aria-label="Edit message"
        >
          <Edit size={12} className="sm:w-3.5 sm:h-3.5" />
        </button>
      )}
      
      {/* Delete button - Available for all messages if onDelete is provided */}
      {onDelete && isUserMessage && (
        <button
          onClick={() => onDelete(messageIndex)}
          className="p-0.5 sm:p-1 rounded hover:bg-red-500/50 text-white text-xs transition-colors duration-100"
          aria-label="Delete message"
        >
          <Trash size={12} className="sm:w-3.5 sm:h-3.5" />
        </button>
      )}
    </div>
  );
}