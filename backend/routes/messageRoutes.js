const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Send a message route
// POST /api/messages/send
router.post('/send', protect, sendMessage);

// Get messages route
// GET /api/messages/:userId
router.get('/:userId', protect, getMessages);

module.exports = router;
