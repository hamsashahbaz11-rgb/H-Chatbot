import { ChatMessage } from "./ChatMessage";
import { EmptyState } from "./EmptyState";

export function ChatMessages({ 
  messages, 
  currentResponse, 
  messagesEndRef, 
  loadingHistory,
  editingMessageId,
  editingContent,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditingContentChange,
  onDeleteMessage
}) {
  const hasMessages = messages.length > 0 || currentResponse;

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-4 space-y-2 sm:space-y-4 w-full">
      {loadingHistory && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
          <p className="text-sm">Loading chat history...</p>
        </div>
      )}
      
      {!hasMessages && !loadingHistory && <EmptyState />}
      
      {messages.map((msg, index) => (
        <ChatMessage 
          key={msg.id || index} 
          message={msg}
          messageIndex={index}
          isEditing={editingMessageId === index}
          editingContent={editingContent}
          onEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onEditingContentChange={onEditingContentChange}
          onDelete={onDeleteMessage}
        />
      ))}

      {currentResponse && (
        <ChatMessage 
          message={{ role: "assistant", content: currentResponse }} 
          messageIndex={-1}
          isStreaming={true}
        />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}