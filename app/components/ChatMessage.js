import { MessageAvatar } from "./MessageAvatar";
import { MessageContent } from "./MessageContent";
import { MessageActions } from "./MessageActions";
import { EditMessageForm } from "./EditMessageForm";

export function ChatMessage({ 
  message, 
  messageIndex, 
  isStreaming = false, 
  isEditing = false,
  editingContent,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onEditingContentChange,
  onDelete
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full px-1 sm:px-2`}>
      <div className={`flex max-w-[85%] sm:max-w-[80%] md:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"} group relative`}>
        <MessageAvatar role={message.role} />
        
        <div className={`rounded-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3 relative ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-100"
        }`}>
          {isEditing ? (
            <EditMessageForm
              content={editingContent}
              onSave={() => onSaveEdit(messageIndex)}
              onCancel={onCancelEdit}
              onChange={onEditingContentChange}
            />
          ) : (
            <>
              <MessageContent 
                role={message.role} 
                content={message.content} 
                isStreaming={isStreaming}
              />
              
              {/* Only show actions for non-streaming messages */}
              {!isStreaming && messageIndex !== -1  && (
                <MessageActions
                  messageIndex={messageIndex}
                  message={message}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isEditing={isEditing}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}