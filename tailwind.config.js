/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        // "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./libs/colors.ts",
    ],
    theme: {
        extend: {
            'height': {
                'em': '1em',
            },
            'contrast': {
                '82': '.82',
            }
        },
    },
    plugins: [],
}
