module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'focus-blue': '#2563EB',
        'calm-slate': '#0F172A',
        'cognitive-white': '#F8FAFC',
        'accent-teal': '#14B8A6',
        'warning-gold': '#F59E0B'
      },
      borderRadius: { xl: '14px' }
    }
  },
  plugins: []
}
