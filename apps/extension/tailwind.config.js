/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--bborder))",
        input: "hsl(var(--binput))",
        ring: "hsl(var(--bring))",
        background: "hsl(var(--bbackground))",
        foreground: "hsl(var(--bforeground))",
        primary: {
          DEFAULT: "hsl(var(--bprimary))",
          foreground: "hsl(var(--bprimary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--bsecondary))",
          foreground: "hsl(var(--bsecondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--bdestructive))",
          foreground: "hsl(var(--bdestructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--bmuted))",
          foreground: "hsl(var(--bmuted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--baccent))",
          foreground: "hsl(var(--baccent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--bpopover))",
          foreground: "hsl(var(--bpopover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--bcard))",
          foreground: "hsl(var(--bcard-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--bradius)",
        md: "calc(var(--bradius) - 2px)",
        sm: "calc(var(--bradius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
