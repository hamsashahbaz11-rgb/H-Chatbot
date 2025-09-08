import { useState, useEffect, useRef } from "react";

export function EditMessageForm({ 
  content, 
  onSave, 
  onCancel, 
  onChange 
}) {
  const [localContent, setLocalContent] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  // Auto-focus and select text when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  const handleSave = () => {
    if (!localContent.trim()) return;
    onChange(localContent.trim());
    onSave();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setLocalContent(value);
    onChange(value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="space-y-3 min-w-0 w-full">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={localContent}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-600 text-sm sm:text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
          style={{ 
            minHeight: '80px', 
            maxHeight: '200px'
          }}
          rows={Math.min(Math.max(localContent.split('\n').length, 3), 8)}
          placeholder="Edit your message..."
        />
        
        {/* Character count indicator */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {localContent.length}
        </div>
      </div>
      
      <div className="flex space-x-2 justify-end">
        <button
          onClick={onCancel}
          className="px-2 py-1 sm:px-3 sm:py-1.5 text-sm rounded-md bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white transition-colors duration-150"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-2 py-1 sm:px-3 sm:py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!localContent.trim()}
        >
          Save & Send
        </button>
      </div>
      
      <div className="text-xs text-gray-400 flex flex-wrap items-center gap-2 sm:gap-4">
        <span>💡 <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Enter</kbd> to save</span>
        <span><kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Shift+Enter</kbd> for new line</span>
        <span><kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Esc</kbd> to cancel</span>
      </div>
    </div>
  );
}