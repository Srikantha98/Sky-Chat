// src/components/Message.js
import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <strong>{message.senderName}</strong>: {message.text}
    </div>
  );
};

export default Message;
