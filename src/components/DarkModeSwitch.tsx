import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const darkModeCookieKey = "cv_darkMode";

const DarkModeSwitch = () => {
	const [darkMode, setDarkMode] = useState<boolean>(() => true);

	useEffect(() => {
		const value = !!getCookie(darkModeCookieKey);
		setDarkMode(() => value ?? true);
	}, []);

	useEffect(() => {
		const containsDark =
			document.documentElement.classList.contains("dark");
		if (containsDark) {
			document.documentElement.classList.remove("dark");
			document.documentElement.classList.add("light");
		} else {
			document.documentElement.classList.remove("light");
			document.documentElement.classList.add("dark");
		}
	}, [darkMode]);

	const handleToggle = () => {
		setDarkMode(!darkMode);
		setCookie(darkModeCookieKey, darkMode);
	};

	return (
		<button
			id="theme-toggle"
			type="button"
			className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
			onClick={handleToggle}>
			Toggle To {darkMode ? "Light" : "Dark"}
		</button>
	);
};

export default DarkModeSwitch;
