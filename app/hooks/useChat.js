import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useParams } from "next/navigation";

export function useChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { data: session } = useSession();
  const { showToast } = useToast(); 
  const id = useParams();
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  // Load existing messages from database
  const loadMessagesFromDb = async () => {
    try {
      setLoadingHistory(true);
      
      if (!id.id) {
        // No conversation ID found, starting fresh chat
        return;
      }

      const response = await fetch(`/api/message?conversationId=${id.id}`);

      if (!response.ok) {
        if (response.status === 404) {
          // No existing messages found, starting fresh chat
          return;
        }
        throw new Error(`Failed to load messages: ${response.status}`);
      }

      const data = await response.json();

      if (data.messages && data.messages.length > 0) {
        const formattedMessages = data.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          id: msg._id,
          timestamp: msg.createdAt
        }));

        setMessages(formattedMessages);

      }
    } catch (error) {
      // Error loading messages from database
      showToast("Error loading messages: " + error.message, "error");
    } finally {
      setLoadingHistory(false);
    }
  };

  // Stop the current response
  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Save partial response if exists
    if (currentResponse) {
      const partialMessage = {
        role: "assistant",
        content: currentResponse + "\n\n*[Response stopped by user]*"
      };
      setMessages(prev => [...prev, partialMessage]);

      // Save to database
      saveMessageToDb(partialMessage).catch(error => {
        // Failed to save stopped message
        showToast("Failed to save message: " + error.message, "error");
      });
    }

    setCurrentResponse("");
    setLoading(false);
  };

  // Start editing a message
  const startEditing = (messageIndex, currentContent) => {
    setEditingMessageId(messageIndex);
    setEditingContent(currentContent);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  // Save edited message and regenerate response
  const saveEdit = async (messageIndex) => {
    if (!editingContent.trim()) return;

    const updatedMessages = [...messages];
    const oldMessage = updatedMessages[messageIndex];

    // Update the message
    updatedMessages[messageIndex] = {
      ...oldMessage,
      content: editingContent.trim()
    };

    // Remove all messages after the edited one (including AI responses)
    const messagesToKeep = updatedMessages.slice(0, messageIndex + 1);
    setMessages(messagesToKeep);

    // Clear editing state
    setEditingMessageId(null);
    setEditingContent("");

    // If editing a user message, regenerate AI response
    if (oldMessage.role === "user") {
      try {
        setLoading(true);
        setCurrentResponse("");

        // First save the updated message
        await saveMessageToDb(updatedMessages[messageIndex]);
        
        // Then try to get AI response
        const response = await streamChat(editingContent.trim());
        if (response) {
          const assistantMessage = { role: "assistant", content: response };
          setMessages(prev => [...prev, assistantMessage]);

          // Save AI response to database
          await saveMessageToDb(assistantMessage);
        }
      } catch (error) {
        // Error regenerating response
        showToast("Error regenerating response: " + error.message, "error");
        
        // Check if it's a message limit error
        if (error.message === "You have reached the message limit") {
          const limitMessage = {
            role: "assistant",
            content: "⚠️ You have reached the message limit for your account. Please upgrade your plan to continue chatting."
          };
          setMessages(prev => [...prev, limitMessage]);
        } else {
          const errorMessage = {
            role: "assistant",
            content: "❌ Error regenerating response: " + error.message
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } finally {
        setCurrentResponse("");
        setLoading(false);
      }
    } else {
      // Just save the edited AI message
      try {
        await saveMessageToDb(updatedMessages[messageIndex]);
      } catch (error) {
        // Failed to save edited message
        showToast("Failed to save edited message: " + error.message, "error");
      }
    }
  };

  // Delete a message and all subsequent messages
  const deleteMessage = async (messageIndex) => {
    if (window.confirm("Are you sure you want to delete this message and all subsequent messages?")) {
      const messagesToKeep = messages.slice(0, messageIndex);
      setMessages(messagesToKeep);

      // TODO: Implement database deletion if needed
      // Message deleted
    }
  };

  // Database operations
  const saveMessageToDb = async (messageData) => {
    try {
    
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: messageData.content,
          role: messageData.role,
          conversationId: id.id
        })
      });

      // Check if response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        
        // Check for message limit specifically
        if (response.status === 400 && errorData.message === "You have reached the message limit") {
          throw new Error("You have reached the message limit");
        }
        
        throw new Error(`Failed to save message: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Error saving message to database
      showToast("Error saving message: " + error.message, "error");
      throw error;
    }
  };

  const sendMessage = async (messageText = message) => {
    if (!messageText.trim()) return;

    const userMessage = { role: "user", content: messageText };
    
    // Clear input immediately for better UX
    setMessage("");
    setLoading(true);
    setCurrentResponse("");

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // First, try to save user message to database
      await saveMessageToDb(userMessage);
      
      // Only add to messages and proceed with streaming if save was successful
      setMessages(prev => [...prev, userMessage]);

      const response = await streamChat(messageText);
      if (response) {
        const assistantMessage = { role: "assistant", content: response };
        setMessages(prev => [...prev, assistantMessage]);

        // Save assistant response to database
        await saveMessageToDb(assistantMessage);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
 
        return;
      }

      // Chat error
      showToast("Chat error: " + error.message, "error");
      
     
      if (error.message === "You have reached the message limit") { 
        const limitMessage = {
          role: "assistant",
          content: "⚠️ You have reached the message limit for your account. Please upgrade your plan to continue chatting."
        };
        setMessages(prev => [...prev, limitMessage]);
        
        // Restore the message text for user to see what they tried to send
        setMessage(messageText);
      } else {
        // For other errors, add user message and show error
        setMessages(prev => [...prev, userMessage]);
        const errorMessage = {
          role: "assistant",
          content: "❌ Error: " + error.message
        };
        setMessages(prev => [...prev, errorMessage]);

        try {
          await saveMessageToDb(errorMessage);
        } catch (dbError) {
          // Failed to save error message
          showToast("Failed to save error message", "error");
        }
      }
    } finally {
      abortControllerRef.current = null;
      setCurrentResponse("");
      setLoading(false);
    }
  };
   
  const getUser = async (email) => {
    try {
      const response = await fetch("/api/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // Error in getUser
      showToast("Error getting user: " + error.message, "error");
    }
  };

  const getConversation = async () => {
    const response = await fetch(`/api/conversation?conversationId=${id.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json(); 

 
    return data.contentOfConversation;
  };


const streamChat = async (messageText) => {
  const conversation = await getConversation();
  const user = await getUser(session.user.email);

  const res = await fetch("/api/chat-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText, user, conversation }),
    signal: abortControllerRef.current?.signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let fullResponse = "";
  
  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        return fullResponse;
      }

      const chunk = decoder.decode(value, { stream: true });
      if(chunk.includes("Stream processing failed")){
        showToast("You have reached the message limit")
      }
      
      // Split by lines and process each line
      const lines = chunk.split("\n");

      for (let line of lines) {
        // Skip empty lines
        if (!line.trim()) continue;
        
        if (line.startsWith("data: ")) {
          try {
            const dataString = line.slice(6); // Remove "data: " prefix
            
            // Check for end-of-stream marker
            if (dataString.trim() === "[DONE]") {
              return fullResponse;
            }
            
            const parsedData = JSON.parse(dataString);
            
            // Handle different response formats
            if (parsedData.text) {
              // New format: { text: "..." }
              fullResponse += parsedData.text;
              setCurrentResponse(fullResponse);
            } else if (typeof parsedData === "string") {
              // Fallback for direct string format
              fullResponse += parsedData;
              setCurrentResponse(fullResponse);
            } else if (parsedData.error) {
              // Handle error messages
              throw new Error(`Server error: ${parsedData.error}`);
            }
            
          } catch (parseError) {
          
             
            }
          } else {
            // Skipping non-data line
        }
      }
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    
    // Clean up reader
    try {
      reader.cancel();
    } catch (cancelError) {
      // Error canceling reader
    }
    
    throw error;
  }
};


  useEffect(() => {
    loadMessagesFromDb();
  }, []);

  return {
    message,
    setMessage,
    messages,
    loading,
    loadingHistory,
    getUser,
    currentResponse,
    messagesEndRef,
    sendMessage,
    saveMessageToDb,
    loadMessagesFromDb,
    refreshMessages: loadMessagesFromDb,
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
  };
}