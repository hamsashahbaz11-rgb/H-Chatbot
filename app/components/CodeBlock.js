"use client"
import { useState } from "react";
import {Prism as  SyntaxHighlighter} from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ node, inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);

  function traverse(node) {
    let result = "";
    if (!node) return result;
    if (node.value !== undefined && node.value !== null) {
      result += node.value;
    }
    if (Array.isArray(node.children)) {
      for (let child of node.children) {
        result += traverse(child);
      }
    }
    return result;
  }

  const code = traverse(node);
  const language = className?.replace("language-", "") || "plaintext";

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }catch (error){
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-600 my-1 sm:my-2 text-sm sm:text-base">
      {language !== "plaintext" && (
        <div className="bg-gray-700 text-gray-300 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm border-b border-gray-600">
          {language}
        </div>
      )}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "0.5rem 0.75rem",
            fontSize: "0.875rem",
            borderRadius: language !== "plaintext" ? "0 0 0.5rem 0.5rem" : "0.5rem",
            background: "#1f2937",
          }}
          wrapLongLines
        >
          {code || "// no code found"}
        </SyntaxHighlighter>
        <button
          onClick={handleCopy}
          className="absolute top-1 sm:top-2 right-1 sm:right-2 p-0.5 sm:p-1 text-xs rounded bg-gray-600 text-white opacity-0 group-hover:opacity-100 transition hover:bg-gray-500"
          aria-label={copied ? "Code copied" : "Copy code"}
        >
        {copied ? 
          <Check className="w-3 h-3 sm:w-4 sm:h-4 p-0.5 sm:p-1 rounded hover:bg-slate-500/50 text-white text-xs transition-colors duration-100" /> : 
          <Copy className="w-3 h-3 sm:w-4 sm:h-4 p-0.5 sm:p-1 rounded hover:bg-slate-500/50 text-white text-xs transition-colors duration-100" />
        }
        </button>
      </div>
    </div>
  );
}

 