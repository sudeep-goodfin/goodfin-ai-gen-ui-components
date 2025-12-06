module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "selector",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        /* GoodFin Font Families */
        sans: ["Soehne", "Open Sans", "system-ui", "sans-serif"],
        primary: ["Soehne", "Open Sans", "sans-serif"],
        "primary-light": ["Soehne Leicht", "Soehne", "Open Sans", "sans-serif"],
        "primary-bold": ["Soehne Kraftig", "Soehne", "Open Sans", "sans-serif"],
        heading: ["Test Signifier", "Soehne", "Georgia", "serif"],
        signifier: ["Signifier", "Test Signifier", "Georgia", "serif"],
        body: ["Open Sans", "Soehne", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* GoodFin Typography Scale */
        /* Headings */
        "h1": ["40px", { lineHeight: "56px", letterSpacing: "0px" }],
        "h2": ["32px", { lineHeight: "40px", letterSpacing: "0px" }],
        "h3": ["24px", { lineHeight: "32px", letterSpacing: "0px" }],
        "h4": ["20px", { lineHeight: "32px", letterSpacing: "0px" }],
        "h5": ["18px", { lineHeight: "24px", letterSpacing: "0px" }],
        "h6": ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        /* Labels (Soehne Kraftig) */
        "label-lg": ["18px", { lineHeight: "24px" }],
        "label-md": ["16px", { lineHeight: "20px" }],
        "label-sm": ["14px", { lineHeight: "16px" }],
        "label-xs": ["12px", { lineHeight: "16px" }],
        /* Paragraphs (Soehne Leicht) */
        "para-lg": ["18px", { lineHeight: "28px" }],
        "para-md": ["16px", { lineHeight: "24px" }],
        "para-sm": ["14px", { lineHeight: "20px" }],
        "para-xs": ["12px", { lineHeight: "16px" }],
      },
      colors: {
        /* GoodFin Primitive Color Palettes */
        grey: {
          50: "var(--grey-50)",
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
          600: "var(--grey-600)",
          700: "var(--grey-700)",
          800: "var(--grey-800)",
          900: "var(--grey-900)",
          950: "var(--grey-950)",
        },
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
          950: "var(--green-950)",
        },
        yellow: {
          50: "var(--yellow-50)",
          100: "var(--yellow-100)",
          200: "var(--yellow-200)",
          300: "var(--yellow-300)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          700: "var(--yellow-700)",
          800: "var(--yellow-800)",
          900: "var(--yellow-900)",
          950: "var(--yellow-950)",
        },
        red: {
          50: "var(--red-50)",
          100: "var(--red-100)",
          200: "var(--red-200)",
          300: "var(--red-300)",
          400: "var(--red-400)",
          500: "var(--red-500)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
          900: "var(--red-900)",
          950: "var(--red-950)",
        },
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
          950: "var(--blue-950)",
        },
        sand: {
          0: "var(--sand-0)",
          50: "var(--sand-50)",
          100: "var(--sand-100)",
          200: "var(--sand-200)",
          300: "var(--sand-300)",
          400: "var(--sand-400)",
          500: "var(--sand-500)",
          600: "var(--sand-600)",
          700: "var(--sand-700)",
          800: "var(--sand-800)",
          900: "var(--sand-900)",
          950: "var(--sand-950)",
        },

        /* Semantic Tokens */
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },
        chat: {
          user: {
            DEFAULT: "var(--chat-user-bg)",
            foreground: "var(--chat-user-foreground)",
          },
          ai: {
            DEFAULT: "var(--chat-ai-bg)",
            foreground: "var(--chat-ai-foreground)",
            "gradient-from": "var(--chat-ai-gradient-from)",
            "gradient-to": "var(--chat-ai-gradient-to)",
          },
          overlay: "var(--chat-overlay-bg)",
          input: {
            DEFAULT: "var(--chat-input-bg)",
            border: "var(--chat-input-border)",
          },
          action: {
            DEFAULT: "var(--chat-action-primary)",
            foreground: "var(--chat-action-primary-foreground)",
          },
        },
      },
      spacing: {
        /* GoodFin Spacing Tokens */
        "gf-xs": "var(--spacing-xs)",
        "gf-sm": "var(--spacing-sm)",
        "gf-md": "var(--spacing-md)",
        "gf-lg": "var(--spacing-lg)",
        "gf-xl": "var(--spacing-xl)",
        "gf-2xl": "var(--spacing-2xl)",
        "gf-3xl": "var(--spacing-3xl)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        /* GoodFin Border Radius Tokens */
        "gf-minimal": "var(--radius-minimal)",
        "gf-small": "var(--radius-small)",
        "gf-medium": "var(--radius-medium)",
        "gf-rounded": "var(--radius-rounded)",
        "gf-large": "var(--radius-large)",
        "gf-xlarge": "var(--radius-xlarge)",
        "gf-full": "var(--radius-full)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
}
