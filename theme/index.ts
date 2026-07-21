import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Madeline Portfolio - Custom Chakra UI v3 System
 *
 * All colors and typography are tokenized here as the single source of truth.
 * Components reference semantic tokens and textStyles instead of hardcoded values.
 */

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: {
            50: { value: '#edf2f7' },
            100: { value: '#d4dfe9' },
            200: { value: '#a8bfd3' },
            300: { value: '#7d9fbd' },
            400: { value: '#5a83a6' },
            500: { value: '#3d6e8e' },
            600: { value: '#2c5f7f' },
            700: { value: '#1e4d6b' },
            800: { value: '#1a3f5c' },
            900: { value: '#1A365D' },
          },
          secondary: {
            50: { value: '#e5f5f4' },
            100: { value: '#ccebe9' },
            200: { value: '#99d7d3' },
            300: { value: '#66c3bd' },
            400: { value: '#33afa7' },
            500: { value: '#319795' },
            600: { value: '#27726f' },
            700: { value: '#1d5653' },
            800: { value: '#133b38' },
            900: { value: '#0a1f1e' },
          },
          accent: {
            50: { value: '#e8f4fb' },
            100: { value: '#d0e9f7' },
            200: { value: '#a1d3ef' },
            300: { value: '#72bde7' },
            400: { value: '#43a7df' },
            500: { value: '#4299E1' },
            600: { value: '#357ab4' },
            700: { value: '#285c87' },
            800: { value: '#1a3d5a' },
            900: { value: '#0d1f2d' },
          },
        },
      },
      fonts: {
        heading: { value: `var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        body: { value: `var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
      },
      fontSizes: {
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '1.75rem' },
        '4xl': { value: '2rem' },
        '5xl': { value: '2.625rem' },
        '6xl': { value: '3rem' },
        '7xl': { value: '3.5rem' },
        '8xl': { value: '4.5rem' },
      },
      fontWeights: {
        normal: { value: 400 },
        medium: { value: 500 },
        semibold: { value: 600 },
        bold: { value: 700 },
        extrabold: { value: 800 },
      },
      radii: {
        sm: { value: '0.125rem' },
        base: { value: '0.25rem' },
        md: { value: '0.375rem' },
        lg: { value: '0.625rem' },
        xl: { value: '0.75rem' },
        '2xl': { value: '1rem' },
        '3xl': { value: '1.5rem' },
        full: { value: '9999px' },
      },
      shadows: {
        sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
        base: { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
        md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
        lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
        xl: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
      },
    },
    textStyles: {
      h1: {
        value: {
          fontSize: '40px',
          fontWeight: 800,
          lineHeight: 1.1,
          sm: { fontSize: '48px' },
          md: { fontSize: '56px' },
          lg: { fontSize: '72px' },
        },
      },
      h2: {
        value: {
          fontSize: '32px',
          fontWeight: 400,
          sm: { fontSize: '36px' },
          md: { fontSize: '42px' },
          lg: { fontSize: '48px' },
        },
      },
      h3: {
        value: {
          fontSize: '1.125rem',
          fontWeight: 400,
          md: { fontSize: '1.25rem' },
          lg: { fontSize: '1.5rem' },
        },
      },
      body: {
        value: {
          fontSize: '16px',
          fontWeight: 400,
          sm: { fontSize: '18px' },
          md: { fontSize: '20px' },
        },
      },
      bodyBold: {
        value: {
          fontSize: '16px',
          fontWeight: 800,
          md: { fontSize: '18px' },
        },
      },
      label: {
        value: {
          fontSize: '18px',
          fontWeight: 800,
          md: { fontSize: '22px' },
        },
      },
      link: {
        value: {
          fontSize: '18px',
          fontWeight: 400,
          md: { fontSize: '22px' },
        },
      },
      button: {
        value: {
          fontSize: '16px',
          fontWeight: 800,
          md: { fontSize: '18px' },
        },
      },
      caption: {
        value: {
          fontSize: '12px',
          fontWeight: 400,
          md: { fontSize: '14px' },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Text
        'text.primary': { value: '#212529' },
        'text.secondary': { value: '#495057' },
        'text.tertiary': { value: '#6C757D' },
        'text.inverse': { value: '#F8F9FA' },

        // Backgrounds
        'bg.primary': { value: '#F8F9FA' },
        'bg.secondary': { value: '#E9ECEF' },
        'bg.surface': { value: 'white' },

        // Borders & Dividers
        'border.default': { value: '#CED4DA' },
        'border.dark': { value: '#495057' },

        // Accents
        'accent.teal': { value: '#107c7c' },
        'accent.tealLight': { value: '#319795' },
        'accent.navy': { value: '#1A365D' },
      },
    },
  },
  globalCss: {
    'html, body': {
      fontFamily: `var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
      fontSize: 'md',
      color: 'text.primary',
      lineHeight: '1.6',
      bg: 'bg.primary',
      margin: 0,
      padding: 0,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none',
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
