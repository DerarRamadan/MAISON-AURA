/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gold: '#d4af37',
                'black-rich': '#0a0a0a',
                cream: '#fdfbf7',
            },
            fontFamily: {
                serif: ['"Amiri"', 'serif'],
                sans: ['"Tajawal"', 'sans-serif'],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-25%)' },
                }
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
            }
        },
        container: {
            center: true,
            padding: '2rem',
        }
    },
    plugins: [],
}
