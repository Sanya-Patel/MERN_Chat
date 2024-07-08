const express = require("express");

const {
    sendMessage, allMessages
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to send a message, protected by the auth middleware
router.route("/").post(protect, sendMessage);

// Route to get all messages for a chat, protected by the auth middleware
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
