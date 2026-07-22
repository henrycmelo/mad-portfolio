import { defineTokens } from '@chakra-ui/react';

/**
 * Primitive color tokens - "Digital Trust, Blueprinted".
 *
 * A high-contrast neutral foundation (pure white to near-black) with one
 * electric blue as the entire personality. Coinbase Blue is reserved for
 * primary actions and brand marks - never for text or decoration.
 *
 * Note: the source reference lists Slate as `#5b616` and Ash as `#8a919` -
 * both five digits, which are not valid CSS colours. The six-digit values
 * from the reference's own colour guide are used here.
 */
export const colors = defineTokens.colors({
  /**
   * Coinbase Blue. Doubles as a Chakra `colorPalette`, so the 50-950 ramp has
   * to exist; 500 is the brand blue, 300 is the lighter Interactive Blue used
   * for secondary links.
   */
  blue: {
    50: { value: '#e6eeff' },
    100: { value: '#cddcff' },
    200: { value: '#a3beff' },
    300: { value: '#578bfa' }, // Interactive Blue - secondary links
    400: { value: '#2a6cff' },
    500: { value: '#0052ff' }, // Coinbase Blue - primary CTAs, brand mark
    600: { value: '#0043d1' },
    700: { value: '#0035a6' },
    800: { value: '#00287d' },
    900: { value: '#001b54' },
    950: { value: '#001133' },
  },

  /** Neutral ramp: pure white through to near-black. */
  neutral: {
    white: { value: '#ffffff' },
    frost: { value: '#f7f8f9' }, // subtle light background
    cloud: { value: '#eef0f3' }, // dividers, hover fills
    pewter: { value: '#dedfe2' }, // borders between light sections
    ash: { value: '#8a919e' }, // helper text, disabled
    slate: { value: '#5b616e' }, // body copy, footer links
    charcoal: { value: '#141519' }, // alternate dark section
    midnight: { value: '#0a0b0d' }, // dark sections, primary text
  },

  /** Market signal colours - the only other saturated hues in the system. */
  status: {
    success: { value: '#27ad75' },
    error: { value: '#f0616d' },
    warning: { value: '#8a919e' },
    info: { value: '#0052ff' },
  },
});
