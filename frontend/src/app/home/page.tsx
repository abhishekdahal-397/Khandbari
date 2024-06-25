"use client";

import { useDispatch } from "react-redux";
import {
	increment,
	decrement,
} from "../GlobalRedux/features/counter/counterSlice";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

export default function Home() {
	//useSelector gets the state from store
	const { username, email } = useSelector((state: RootState) => state.user);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center mb-4">
					Welcome, {username ? username : "suahan"}
				</h1>
				<p className="text-center">
					Email: {email ? email : "sushan@gmail.com"}
				</p>
			</div>
		</div>
	);
}
