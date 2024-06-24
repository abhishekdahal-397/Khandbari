import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link className="rounded mx-4 my-2 bg-orange-400 h-5 w-8" href="/login">
				Login
			</Link>
			<Link
				className="rounded mx-4 my-2 bg-orange-400 h-5 w-8"
				href="/register"
			>
				register
			</Link>
		</main>
	);
}
