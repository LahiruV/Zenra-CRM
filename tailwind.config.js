/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50, #eff6ff)',
          100: 'var(--color-primary-100, #dbeafe)',
          200: 'var(--color-primary-200, #bfdbfe)',
          300: 'var(--color-primary-300, #93c5fd)',
          400: 'var(--color-primary-400, #60a5fa)',
          500: 'var(--color-primary-500, #3b82f6)',
          600: 'var(--color-primary-600, #2563eb)',
          700: 'var(--color-primary-700, #1d4ed8)',
          800: 'var(--color-primary-800, #1e40af)',
          900: 'var(--color-primary-900, #1e3a8a)',
        },
        secondary: {
          50: 'var(--color-secondary-50, #faf5ff)',
          100: 'var(--color-secondary-100, #f3e8ff)',
          200: 'var(--color-secondary-200, #e9d5ff)',
          300: 'var(--color-secondary-300, #d8b4fe)',
          400: 'var(--color-secondary-400, #c084fc)',
          500: 'var(--color-secondary-500, #a855f7)',
          600: 'var(--color-secondary-600, #9333ea)',
          700: 'var(--color-secondary-700, #7c3aed)',
          800: 'var(--color-secondary-800, #6b21a8)',
          900: 'var(--color-secondary-900, #581c87)',
        },
        accent: {
          50: 'var(--color-accent-50, #ecfdf5)',
          100: 'var(--color-accent-100, #d1fae5)',
          200: 'var(--color-accent-200, #a7f3d0)',
          300: 'var(--color-accent-300, #6ee7b7)',
          400: 'var(--color-accent-400, #34d399)',
          500: 'var(--color-accent-500, #10b981)',
          600: 'var(--color-accent-600, #059669)',
          700: 'var(--color-accent-700, #047857)',
          800: 'var(--color-accent-800, #065f46)',
          900: 'var(--color-accent-900, #064e3b)',
        },
      },
    },
  },
  plugins: [],
};