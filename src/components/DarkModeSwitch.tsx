import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const darkModeKey = "dark-mode";

const DarkModeSwitch = () => {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		const cachedValue = localStorage.getItem(darkModeKey);

		if (cachedValue === null) {
			console.log(
				"has no cached value for dark mode, setting as false."
			);
			localStorage.setItem(darkModeKey, "false");
			return false;
		}
		return !!cachedValue;
	});

	useEffect(() => {
		const handleThemeToggle = () => {
			const { classList } = document.documentElement;

			const containsDark = classList.contains("dark");
			const containsLight = classList.contains("light");

			console.log("contains dark: ", containsDark);
			console.log("contains light: ", containsLight);

			if (!containsLight && !containsDark) {
				console.log("first load");
				classList.add(darkMode ? "dark" : "light");
				return;
			}

			if (containsLight) {
				classList.remove("light");
				classList.add("dark");
			}

			if (containsDark) {
				classList.remove("dark");
				classList.add("light");
			}

			localStorage.setItem(darkModeKey, JSON.stringify(darkMode));
		};

		handleThemeToggle();
	}, [darkMode]);

	const handleToggle = () => {
		setDarkMode(!darkMode);
	};

	return (
		<button
			className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
			onClick={handleToggle}>
			{darkMode ? <FaMoon /> : <FaSun />}
		</button>
	);
};

export default DarkModeSwitch;
