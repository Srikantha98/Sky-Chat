const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id; // Get the sender's ID from the request object (attached by the authMiddleware)

  try {
    // Ensure the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Create a new message
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    // Save the message to the database
    await message.save();

    res.status(201).json({
      message: 'Message sent successfully',
      message: { id: message._id, content: message.content, sender: senderId, receiver: receiverId },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  const userId = req.user.id; // Get the authenticated user's ID
  const receiverId = req.params.userId; // Get the receiver's ID from the URL

  try {
    // Ensure the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Retrieve the messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time (ascending)

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
