/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
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
