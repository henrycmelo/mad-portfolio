import { defineTokens } from '@chakra-ui/react';

/**
 * Primitive color tokens - Dropbox-inspired palette.
 *
 * Confident blue for anything interactive, on a warm paper-like canvas rather
 * than clinical white. Raw values only; design intent lives in
 * theme/semantic-tokens.ts and components reference that.
 */
export const colors = defineTokens.colors({
  /**
   * Brand blue. Doubles as a Chakra `colorPalette`, so the 50-950 ramp has to
   * exist even though only a few steps are used directly.
   * 500 is the brand blue; 700 is the documented hover.
   */
  brand: {
    50: { value: '#EBF2FF' },
    100: { value: '#D6E4FF' },
    200: { value: '#ADC9FF' },
    300: { value: '#84AEFF' },
    400: { value: '#3D86FF' },
    500: { value: '#0061FF' }, // primary - CTAs, links, interactive
    600: { value: '#0055E0' },
    700: { value: '#0048BD' }, // hover
    800: { value: '#003690' },
    900: { value: '#002670' },
    950: { value: '#001A4D' },
  },

  /** Creative accents. Marketing moments only - never product UI. */
  coral: {
    default: { value: '#FF5C35' },
    sunset: { value: '#FF8C69' },
  },

  /** Neutrals - warm, not grey. */
  neutral: {
    ink: { value: '#1E1919' }, // headings, body
    slate: { value: '#637282' }, // captions, metadata
    muted: { value: '#9EA9B2' }, // placeholders
    border: { value: '#D8D6D3' }, // dividers, input borders
    borderSubtle: { value: '#EDECEA' }, // light section separators
    warm: { value: '#F7F5F2' }, // warm off-white surface
    white: { value: '#FFFFFF' },
  },

  /** Status. `info` deliberately reuses the brand blue. */
  status: {
    success: { value: '#0AC27D' },
    error: { value: '#C0392B' },
    warning: { value: '#F5A623' },
    info: { value: '#0061FF' },
  },
});
