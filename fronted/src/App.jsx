import { useState } from "react";
import "./style/App.css";

import Sidebar from "./component/Sidebar";
import ChatWindow from "./component/ChatWindow";
import MessageInput from "./component/MessageInput";

import { sendToAI } from "./api/chatbot";

function App() {
  // Store all chats
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: [
        {
          sender: "ai",
          text: "Welcome! 👋 I'm your AI Assistant.",
        },
      ],
    },
  ]);

  // Active chat ID
  const [activeChat, setActiveChat] = useState(1);

  const [loading, setLoading] = useState(false);

  // Current chat
  const currentChat = chats.find((chat) => chat.id === activeChat);

  // Send message
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          title: chat.title === "New Chat" ? text : chat.title,
          messages: [
            ...chat.messages,
            {
              sender: "user",
              text,
            },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);

    setLoading(true);

    try {
      const reply = await sendToAI(text);

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  sender: "ai",
                  text: reply,
                },
              ],
            };
          }
          return chat;
        })
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  sender: "ai",
                  text: "❌ Failed to connect to backend.",
                },
              ],
            };
          }
          return chat;
        })
      );
    }

    setLoading(false);
  };

  // Create a new chat
  const newChat = () => {
    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [
        {
          sender: "ai",
          text: "Welcome! 👋 I'm your AI Assistant.",
        },
      ],
    };

    setChats((prev) => [...prev, chat]);
    setActiveChat(chat.id);
  };

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        newChat={newChat}
        selectChat={setActiveChat}
      />

      <div className="main">
        <ChatWindow
          messages={currentChat.messages}
          loading={loading}
        />

        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;