/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"roboto-slab": ["Roboto Slab"],
				"fira-mono": ["Fira Mono"],
			},
		},
	},
	plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
