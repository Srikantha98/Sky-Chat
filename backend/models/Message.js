const mongoose = require('mongoose');

// Define the schema for the Message model
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true, // Sender is required
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true, // Receiver is required
  },
  content: {
    type: String,
    required: true, // Content of the message is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
  // Optionally, you can add more fields like message status (read/unread), etc.
});

// Export the Message model to be used in other parts of the app
module.exports = mongoose.model('Message', MessageSchema);
