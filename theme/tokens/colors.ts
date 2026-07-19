/**
 * Color tokens for the design system
 * Professional Blues & Teals palette
 */

export const colors = {
  brand: {
    primary: {
      50: '#e6eef6',
      100: '#ccdced',
      200: '#99b9db',
      300: '#6696c9',
      400: '#3373b7',
      500: '#0050a5',
      600: '#004084',
      700: '#003063',
      800: '#002042',
      900: '#1A365D', // Navy - Primary brand color
    },
    secondary: {
      50: '#e5f5f4',
      100: '#ccebe9',
      200: '#99d7d3',
      300: '#66c3bd',
      400: '#33afa7',
      500: '#319795', // Teal - Secondary brand color
      600: '#27726f',
      700: '#1d5653',
      800: '#133b38',
      900: '#0a1f1e',
    },
    accent: {
      50: '#e8f4fb',
      100: '#d0e9f7',
      200: '#a1d3ef',
      300: '#72bde7',
      400: '#43a7df',
      500: '#4299E1', // Light Blue - Accent color
      600: '#357ab4',
      700: '#285c87',
      800: '#1a3d5a',
      900: '#0d1f2d',
    },
  },
  semantic: {
    background: {
      primary: 'gray.50',
      secondary: 'white',
      tertiary: 'gray.100',
    },
    surface: {
      card: 'white',
      overlay: 'rgba(0, 0, 0, 0.6)',
    },
    text: {
      primary: 'gray.900',
      secondary: 'gray.600',
      tertiary: 'gray.500',
      inverse: 'white',
    },
    border: {
      default: 'gray.200',
      hover: 'gray.300',
      focus: 'brand.primary.500',
    },
  },
};
