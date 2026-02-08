/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        {
            pattern: /(bg|text|border|shadow)-(slate|blue|purple|emerald|orange|rose|neutral|zinc|black)-(50|100|200|300|400|500|600|700|800|900|950)/,
        },
        {
            pattern: /shadow-/,
        },
        {
            pattern: /border-t-/,
        }
    ]
}
