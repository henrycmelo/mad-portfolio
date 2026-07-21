import { defineSemanticTokens } from '@chakra-ui/react';

/**
 * Semantic tokens - design intent mapped onto the primitives in tokens/colors.ts.
 * No light/dark split; the site is single-mode.
 *
 * Components reference THESE names, never a primitive and never a raw
 * `var(--chakra-colors-*)`: these keys are flat and quoted, so Chakra emits
 * variable names with an escaped dot, and hand-written guesses at the name
 * resolve to nothing.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    // ─── Text ──────────────────────────────────────────────
    'text.primary': { value: '{colors.neutral.ink}' }, // headings, body
    'text.secondary': { value: '{colors.neutral.slate}' }, // captions, metadata
    'text.tertiary': { value: '{colors.neutral.slate}' },
    'text.muted': { value: '{colors.neutral.muted}' }, // placeholders
    'text.inverse': { value: '{colors.neutral.white}' },
    'text.link': { value: '{colors.brand.500}' },

    // ─── Surfaces ──────────────────────────────────────────
    // The warm off-white is the secondary surface - it replaces whitespace as
    // a resting area. It is warm, not grey; never substitute a neutral grey.
    'bg.primary': { value: '{colors.neutral.white}' },
    'bg.surface': { value: '{colors.neutral.white}' },
    'bg.warm': { value: '{colors.neutral.warm}' },
    'bg.secondary': { value: '{colors.neutral.warm}' },
    'bg.muted': { value: '{colors.neutral.warm}' },

    // ─── Borders ───────────────────────────────────────────
    'border.default': { value: '{colors.neutral.border}' },
    'border.subtle': { value: '{colors.neutral.borderSubtle}' },
    'border.dark': { value: '{colors.neutral.muted}' },

    // ─── Accents ───────────────────────────────────────────
    'accent.brand': { value: '{colors.brand.500}' },
    'accent.brandHover': { value: '{colors.brand.700}' },
    // Marketing moments only - never product UI.
    'accent.coral': { value: '{colors.coral.default}' },
    'accent.sunset': { value: '{colors.coral.sunset}' },

    // ─── Status ────────────────────────────────────────────
    'status.success': { value: '{colors.status.success}' },
    'status.error': { value: '{colors.status.error}' },
    'status.warning': { value: '{colors.status.warning}' },
    'status.info': { value: '{colors.status.info}' },

    // ─── Interaction ───────────────────────────────────────
    // Every interactive element is blue. Hover and active are decided here
    // rather than re-invented per component.
    'interactive.default': { value: '{colors.brand.500}' },
    'interactive.hover': { value: '{colors.brand.700}' },
    'interactive.active': { value: '{colors.brand.800}' },
    'interactive.disabled': { value: '{colors.neutral.border}' },

    /**
     * Chakra `colorPalette` slots. Defining these lets the stock <Button>,
     * <IconButton> and friends render brand blue via colorPalette="brand"
     * (set globally in theme/index.ts) instead of Chakra's default grey.
     */
    brand: {
      solid: { value: '{colors.brand.500}' },
      contrast: { value: '{colors.neutral.white}' },
      fg: { value: '{colors.brand.700}' },
      muted: { value: '{colors.brand.100}' },
      subtle: { value: '{colors.brand.50}' },
      emphasized: { value: '{colors.brand.700}' },
      focusRing: { value: '{colors.brand.500}' },
      border: { value: '{colors.brand.500}' },
    },
  },
});
