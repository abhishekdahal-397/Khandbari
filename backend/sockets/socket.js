const socketIo = require("socket.io");
const Message = require("../models/message");

module.exports = (server) => {
	const io = socketIo(server);

	io.on("connection", (socket) => {
		console.log("A user connected");

		socket.on("sendMessage", async (data) => {
			const { senderId, receiverId, content } = data;
			try {
				const message = new Message({
					sender: senderId,
					receiver: receiverId,
					content,
				});
				await message.save();

				// Emit the message to the receiver
				io.to(receiverId).emit("receiveMessage", message);
			} catch (error) {
				console.error("Error saving message:", error);
			}
		});

		socket.on("disconnect", () => {
			console.log("User disconnected");
		});
	});

	return io;
};
