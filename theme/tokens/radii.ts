import { defineTokens } from '@chakra-ui/react';

/**
 * Border radius scale.
 *
 * `md` (8px) is the workhorse - buttons, inputs, cards.
 */
export const radii = defineTokens.radii({
  none: { value: '0' }, // full-bleed imagery
  sm: { value: '4px' }, // badges, status chips
  base: { value: '6px' }, // inputs
  md: { value: '8px' }, // buttons, cards
  lg: { value: '12px' }, // feature cards
  xl: { value: '16px' },
  '2xl': { value: '20px' },
  '3xl': { value: '24px' },
  full: { value: '9999px' }, // avatars, colour chips
});
