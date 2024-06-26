const express = require("express");
const router = express.Router();
const {
	getMessages,
	sendMessage,
} = require("../controllers/messageController");
// Message routes
router.get("/messages/:userId/:recipientId", getMessages);
router.post("/messages/send", sendMessage);
