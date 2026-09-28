/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: { 50:'#F8F9F8', 100:'#F3F4F2', 200:'#E4E7E5', 300:'#D9DDDA', 400:'#A3AAA6', 500:'#7A817D', 600:'#626966', 700:'#454B48', 800:'#2A2F2C', 900:'#111111', 950:'#0B1210' },
        border: "hsl(var(--ui-border))",
        input: "hsl(var(--ui-input))",
        ring: "hsl(var(--ui-ring))",
        background: "hsl(var(--ui-background))",
        foreground: "hsl(var(--ui-foreground))",
        primary: {
          DEFAULT: "hsl(var(--ui-primary))",
          foreground: "hsl(var(--ui-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--ui-secondary))",
          foreground: "hsl(var(--ui-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--ui-destructive) / <alpha-value>)",
          foreground: "hsl(var(--ui-destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--ui-muted))",
          foreground: "hsl(var(--ui-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--ui-accent))",
          foreground: "hsl(var(--ui-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--ui-popover))",
          foreground: "hsl(var(--ui-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--ui-card))",
          foreground: "hsl(var(--ui-card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--ui-sidebar-background))",
          foreground: "hsl(var(--ui-sidebar-foreground))",
          primary: "hsl(var(--ui-sidebar-primary))",
          "primary-foreground": "hsl(var(--ui-sidebar-primary-foreground))",
          accent: "hsl(var(--ui-sidebar-accent))",
          "accent-foreground": "hsl(var(--ui-sidebar-accent-foreground))",
          border: "hsl(var(--ui-sidebar-border))",
          ring: "hsl(var(--ui-sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--ui-radius) + 4px)",
        lg: "var(--ui-radius)",
        md: "calc(var(--ui-radius) - 2px)",
        sm: "calc(var(--ui-radius) - 4px)",
        xs: "calc(var(--ui-radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}