import LeftSection from "./leftSection/page";
import ChatSection from "./chatSection/page";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex">
				<LeftSection />
				<ChatSection />
			</body>
		</html>
	);
}
