"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/GlobalRedux/store";

const ChatSection = () => {
	const { username, email } = useSelector((state: RootState) => state.user);

	return (
		<>
			<div className="bg-white rounded-lg shadow-md w-80">
				<div className="bg-gray-200 px-4 py-2 rounded-t-lg">
					<h2 className="text-lg font-semibold">love</h2>
				</div>
				<div className="p-4 h-[80vh]">
					{/* Replace with actual messages */}
					<div className="flex items-center space-x-2 mb-2">
						<div className="rounded-full bg-blue-500 w-4 h-4"></div>
						<p className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">Hello!</p>
					</div>
					<div className="flex items-center space-x-2 mb-2">
						<div className="rounded-full bg-blue-500 w-4 h-4"></div>
						<p className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
							How are you?
						</p>
					</div>
					{/* Additional messages can be added here */}
				</div>
				<div className="flex p-2">
					<input
						type="text"
						className="flex-1 rounded-full border-gray-200 border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Type a message..."
					/>
					<button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
						Send
					</button>
				</div>
			</div>
		</>
	);
};

export default ChatSection;
