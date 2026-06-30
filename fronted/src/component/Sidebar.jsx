import "../style/Sidebar.css";

function Sidebar({ chats, activeChat, newChat, selectChat }) {
  return (
    <div className="sidebar">
      <div className="logo">
        🤖 <span>AI Chatbot</span>
      </div>

      <button className="new-chat-btn" onClick={newChat}>
        + New Chat
      </button>

      <div className="history-section">
        <h3>Recent Chats</h3>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={
                activeChat === chat.id
                  ? "chat-item active"
                  : "chat-item"
              }
              onClick={() => selectChat(chat.id)}
            >
              💬 {chat.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;