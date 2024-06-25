"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const LeftSection = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	interface User {
		username: string;
		// Add other properties if needed
	}

	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3003/api/users/getUsers"
				);
				// Assuming the response is { users: [...] }
				setData(response.data.users);
				JSON.stringify(data);
				data.map((user, index) => {
					users.push(user.username);
				});
				setUsers(response.data.users.username);
			} catch (error: any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="h-screen w-1/4 bg-gray-200 p-4">
			<h2 className="text-xl font-semibold mb-4">Users</h2>
			<ul>
				{data.map((user, index) => (
					<li
						key={index}
						className="bg-white rounded-lg shadow-md mb-2 p-3 cursor-pointer hover:bg-gray-100"
					>
						{user.username}
					</li>
				))}
			</ul>
		</div>
	);
};

export default LeftSection;
