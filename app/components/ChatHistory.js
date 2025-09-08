"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useToast } from "../context/ToastContext";
import { getUser } from "./Navbar";

const ChatHistory = () => {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const { showToast } = useToast();


  const handleConversationsHistory = async () => {
    try {
      const user = await getUser(session.user.email);
    
    
      if (!user._id) return;

      const response = await fetch(`/api/conversation?userId=${user._id}`);
      const data = await response.json();
      

      setConversations(data.conversations || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      showToast("Error loading conversations: " + error.message, "error");
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      const response = await fetch(`/api/conversation?conversationId=${conversationId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      });
      
      if (response.status === 200) {
        // Remove the deleted conversation from the state
        setConversations(prev => prev.filter(conv => conv._id !== conversationId));
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      showToast("Error deleting conversation: " + error.message, "error");
    }
  };

  const handleEditConversation = async (conversationId, newTitle) => {
    try {
      const response = await fetch('/api/conversation/', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          conversationId,
          title: newTitle 
        })
      });

      if (response.status === 200) {
        // Update the conversation title in the state
        setConversations(prev => 
          prev.map(conv => 
            conv._id === conversationId 
              ? { ...conv, title: newTitle }
              : conv
          )
        );
        setEditingId(null);
        setEditingTitle("");
      }
    } catch (error) {
      showToast("Error updating conversation: " + error.message, "error");
    }
  };

  const startEditing = (conversationId, currentTitle) => {
    setEditingId(conversationId);
    setEditingTitle(currentTitle);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEdit = (conversationId) => {
    if (editingTitle.trim()) {
      handleEditConversation(conversationId, editingTitle.trim());
    }
  };

  // fetch conversations on mount
  useEffect(() => {
    if (session?.user) {
      handleConversationsHistory();
    }
  }, [session]);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-0.5 bg-black text-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Chat History <span className="text-xs  text-slate-700 "> {conversations.length} Chats </span></h2>
      
      {conversations.length === 0 ? (
        <div className="text-center py-12 text-gray-200">
          <p className="text-lg">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="flex justify-between py-1 px-2  bg-slate-900 rounded-xl shadow-xl  hover:border-amber-500 hover:border hover:shadow-md transition-shadow"
            >
              <Link href={`/chat/${conversation._id}`} className="flex-1 min-w-0">
                <div className="flex flex-col">
                  {editingId === conversation._id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveEdit(conversation._id);
                          } else if (e.key === 'Escape') {
                            cancelEditing();
                          }
                        }}
                        autoFocus
                        onClick={(e) => e.preventDefault()}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          saveEdit(conversation._id);
                        }}
                        className="py-1 px-2  bg-blue-500 text-white rounded text-xs hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          cancelEditing();
                        }}
                        className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-200 truncate">
                        {conversation.title}
                      </h3>
                      <p className="text-gray-700 text-xs mt-1">
                        {formatDate(conversation.createdAt)}
                      </p>
                    </>
                  )}
                </div>
              </Link>
              
              {editingId !== conversation._id && (
                <div className="flex items-center space-x-2 ml-4">
                  {/* Rename Button */}
                  <button
                    onClick={() => startEditing(conversation._id, conversation.title)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Rename conversation"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                      />
                    </svg>
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this conversation?')) {
                        handleDeleteConversation(conversation._id);
                      }
                    }}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete conversation"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;