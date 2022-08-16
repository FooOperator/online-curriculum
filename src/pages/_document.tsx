import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html className="min-h-screen min-w-full">
			<Head />
			<body className="min-h-full min-w-full dark:bg-slate-800 bg-slate-200">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
