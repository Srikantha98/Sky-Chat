// src/pages/ChatRoom.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import ChatList from '../components/ChatList';
import Navbar from '../components/Navbar';

const ChatRoom = () => {
  const history = useHistory();
  const [chats, setChats] = useState([
    { name: 'General Chat', id: 1 },
    { name: 'Tech Talk', id: 2 },
    { name: 'Random', id: 3 },
  ]);
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  const handleLogout = () => {
    // Handle logout, clear user session
    localStorage.removeItem('user');
    history.push('/login');
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-room">
      <Navbar onLogout={handleLogout} user={JSON.parse(localStorage.getItem('user'))} />
      <div className="chat-room-container">
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default ChatRoom;
