"use client";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/app/GlobalRedux/store";

interface Message {
	senderId: string;
	receiverId: string;
	content: string;
}

const ChatSection: React.FC = () => {
	const { userId, username, email } = useSelector(
		(state: RootState) => state.user
	);
	const socket = useRef<Socket | null>(null);
	const messagesRef = useRef<Message[]>([]);
	const [messageInput, setMessageInput] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]); // State to trigger re-render

	useEffect(() => {
		socket.current = io("http://localhost:3001"); // Connect to Socket.IO server

		socket.current.on("receiveMessage", (message: Message) => {
			messagesRef.current = [...messagesRef.current, message];
			setMessages([...messagesRef.current]); // Update state to trigger re-render
		});

		return () => {
			socket.current?.disconnect(); // Clean up on component unmount
		};
	}, []);

	const fetchMessages = async () => {
		try {
			const recipientId = "use-client"; // Define recipientId for testing
			const response = await axios.get<Message[]>(
				`/api/users/messages/${userId}/${recipientId}`
			);
			const messages = response.data;
			messagesRef.current = messages;
			setMessages(messages); // Update state to trigger re-render
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	};

	const sendMessage = () => {
		const recipient = "6679409375edcb14978db5e7"; // Replace with recipient's ID
		if (messageInput.trim()) {
			const message: Message = {
				senderId: userId as string,
				receiverId: recipient,
				content: messageInput.trim(),
			};
			socket.current?.emit("sendMessage", message);
			messagesRef.current = [...messagesRef.current, message];
			setMessages([...messagesRef.current]); // Update state to trigger re-render
			setMessageInput(""); // Clear input field
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md w-80">
			<div className="bg-gray-200 px-4 py-2 rounded-t-lg">
				<h2 className="text-lg font-semibold">Chat</h2>
			</div>
			<div className="p-4 h-[80vh] overflow-y-auto">
				{messages.map((msg, index) => (
					<div key={index} className="flex items-center space-x-2 mb-2">
						<div className="rounded-full bg-blue-500 w-4 h-4"></div>
						<p className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
							{msg.senderId === userId ? "Me" : "Them"}: {msg.content}
						</p>
					</div>
				))}
			</div>
			<div className="flex p-2">
				<input
					id="messageInput"
					type="text"
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					className="flex-1 rounded-full border-gray-200 border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Type a message..."
				/>
				<button
					onClick={sendMessage}
					className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatSection;
