// src/components/ChatList.js
import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      {chats.length === 0 ? (
        <p>No chats available</p>
      ) : (
        chats.map((chat, index) => (
          <div key={index} onClick={() => onSelectChat(chat)} className="chat-item">
            <span>{chat.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;
