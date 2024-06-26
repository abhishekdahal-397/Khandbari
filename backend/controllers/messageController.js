const Message = require("../models/message");

const getMessages = async (req, res) => {
	const { userId, recipientId } = req.params;
	try {
		const messages = await Message.find({
			$or: [
				{ sender: userId, receiver: recipientId },
				{ sender: recipientId, receiver: userId },
			],
		}).sort("timestamp");
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getMessages };
