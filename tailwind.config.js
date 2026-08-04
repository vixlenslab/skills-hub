import tailwindcssAnimate from 'tailwindcss-animate'

// Tema Luma DS — mesma base do vixlens-ds: mauve + primary amarelo Vixlens,
// raios arredondados (card/botão 32px, input 24px, chip 12px), Host Grotesk.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: { DEFAULT: 'hsl(var(--primary) / <alpha-value>)', foreground: 'hsl(var(--primary-foreground) / <alpha-value>)' },
        secondary: { DEFAULT: 'hsl(var(--secondary) / <alpha-value>)', foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)' },
        muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
        accent: { DEFAULT: 'hsl(var(--accent) / <alpha-value>)', foreground: 'hsl(var(--accent-foreground) / <alpha-value>)' },
        destructive: { DEFAULT: 'hsl(var(--destructive) / <alpha-value>)', foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)' },
        popover: { DEFAULT: 'hsl(var(--popover) / <alpha-value>)', foreground: 'hsl(var(--popover-foreground) / <alpha-value>)' },
        card: { DEFAULT: 'hsl(var(--card) / <alpha-value>)', foreground: 'hsl(var(--card-foreground) / <alpha-value>)' },
        // tokens de marca Vixlens
        'vix-amarelo': '#FAC617',
        'vix-amarelo-hover': '#E5A800',
        'vix-amarelo-light': '#FEF3C7',
        'vix-preto': '#1D1D1F',
        'vix-azul': '#0439D9',
        'vix-cinza-borda': '#606F7F',
      },
      borderRadius: {
        // raios Luma (single source vixlens-tokens.json)
        'vix-card': '32px',
        'vix-button': '32px',
        'vix-input': '24px',
        'vix-chip': '12px',
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Host Grotesk', 'sans-serif'],
        vix: ['Host Grotesk', 'sans-serif'],
      },
      maxWidth: {
        'vix-site': '1100px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
