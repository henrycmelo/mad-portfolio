import { defineTokens } from '@chakra-ui/react';

/**
 * Typography tokens.
 *
 * The design calls for Sharp Grotesk, which is licence-restricted (the only
 * available files are Monotype trials, not licensed for web embedding).
 * Archivo is the stand-in: the closest free grotesque, with sharp terminals and
 * real weight at 800. Loaded by next/font in app/layout.tsx as --font-archivo.
 */
const archivo = `var(--font-archivo), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

export const fonts = defineTokens.fonts({
  heading: { value: archivo },
  body: { value: archivo },
  mono: { value: `Menlo, Monaco, 'Courier New', monospace` },
});

export const fontSizes = defineTokens.fontSizes({
  xs: { value: '12px' }, // caption
  sm: { value: '14px' }, // app UI
  md: { value: '17px' }, // body
  lg: { value: '20px' },
  xl: { value: '24px' }, // h3
  '2xl': { value: '28px' },
  '3xl': { value: '32px' },
  '4xl': { value: '36px' }, // h2
  '5xl': { value: '44px' },
  '6xl': { value: '52px' }, // h1
  '7xl': { value: '62px' },
  '8xl': { value: '72px' }, // display
});

export const fontWeights = defineTokens.fontWeights({
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
  extrabold: { value: '800' },
});

export const lineHeights = defineTokens.lineHeights({
  display: { value: '1.05' },
  tight: { value: '1.1' },
  snug: { value: '1.15' },
  heading: { value: '1.3' },
  ui: { value: '1.5' },
  normal: { value: '1.6' },
  caption: { value: '1.4' },
});

/**
 * Negative tracking on the big sizes is what makes the display type feel like
 * the brand rather than a default sans.
 */
export const letterSpacings = defineTokens.letterSpacings({
  display: { value: '-0.03em' },
  tighter: { value: '-0.02em' },
  tight: { value: '-0.01em' },
  normal: { value: '0' },
  wide: { value: '0.02em' },
});
