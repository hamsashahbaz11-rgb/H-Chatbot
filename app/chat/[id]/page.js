"use client";
import { ChatHeader }  from "../../components/ChatHeader";
import { ChatMessages } from "../../components/ChatMessages";
import { ChatInput } from "../../components/ChatInput";
import { useChat } from "../../hooks/useChat";
import { useEffect, useState } from "react"; 
import { StopButton } from "../../components/StopButton";
import { useParams } from "next/navigation"; 
import Footer from "@/app/components/Footer";
 
export default function ChatInterface() {
  const {
    message,
    setMessage,
    messages,
    loading,
    loadingHistory,
    currentResponse,
    messagesEndRef,
    sendMessage,
    // Edit functionality
    editingMessageId,
    editingContent,
    setEditingContent,
    startEditing,
    cancelEditing,
    saveEdit,
    // Delete functionality
    deleteMessage,
    // Stop functionality
    stopResponse
  } = useChat();

  
  
  return (
    <div className="flex flex-col h-screen bg-gray-800 w-full max-w-full overflow-hidden">
      <ChatHeader /> 
      <ChatMessages 
        messages={messages}
        currentResponse={currentResponse}
        messagesEndRef={messagesEndRef}
        loadingHistory={loadingHistory}
        editingMessageId={editingMessageId}
        editingContent={editingContent}
        onStartEdit={startEditing}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEditing}
        onEditingContentChange={setEditingContent}
        onDeleteMessage={deleteMessage}
      />
      
      {/* Stop button when AI is responding */}
      {loading && (
        <div className="px-4 pb-2 flex justify-center">
          <StopButton onStop={stopResponse} loading={loading} />
        </div>
      )}
      
      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  );
}
 