// src/components/ChatBox.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, fetchMessages } from '../store/actions';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');  // Backend server URL

const ChatBox = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch initial messages when component mounts
    dispatch(fetchMessages());

    // Listen for new messages from Socket.io
    socket.on('message', (newMessage) => {
      dispatch({ type: 'NEW_MESSAGE', payload: newMessage });
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessage(message));
      socket.emit('message', { text: message });
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span>{msg.senderName}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message..." 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
