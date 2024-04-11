module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", // Look for Tailwind classes in all JS/TSX files in the src directory
	],
	theme: {
		fontFamily: { pixelify: ["Pixelify Sans"] },
		extend: {
			boxShadow: {
				glow: "0 10px 20px #f02eaab3",
			},
		}, // Add your custom theme extensions here
	},
	plugins: [], // Add any additional Tailwind plugins here
};
