"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3003/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (!response.ok) {
				setErrorMessage(data.error || "An error occurred. Please try again.");
				console.log(data.error || "error occurred");
				const errorText = await response.text();
				throw new Error(
					`HTTP error! Status: ${response.status}, Text: ${errorText}`
				);
			}

			// Clear form fields and error message
			setEmail("");
			setPassword("");
			setErrorMessage("");

			// Redirect to the desired page after successful login
			router.push("/home");
		} catch (error) {
			console.log("Error :", error);

			setErrorMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center mb-4">Login</h1>

				{errorMessage && (
					<div className="text-red-500 text-center mb-4">Error</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Enter username"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Login
						</button>
						<a
							href="#"
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
