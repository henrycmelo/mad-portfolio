import { defineTokens } from '@chakra-ui/react';

/**
 * Elevation. Four deliberate levels - flat surfaces are the default, and depth
 * is reserved for things that actually float.
 */
export const shadows = defineTokens.shadows({
  none: { value: 'none' }, // sidebar, page background
  sm: { value: '0 1px 3px rgba(0, 0, 0, 0.08)' },
  raised: { value: '0 1px 3px rgba(0, 0, 0, 0.08)' }, // cards
  md: { value: '0 4px 12px rgba(0, 0, 0, 0.12)' },
  overlay: { value: '0 4px 12px rgba(0, 0, 0, 0.12)' }, // dropdowns, popovers
  lg: { value: '0 8px 32px rgba(0, 0, 0, 0.15)' },
  modal: { value: '0 8px 32px rgba(0, 0, 0, 0.15)' }, // dialogs
  xl: { value: '0 8px 32px rgba(0, 0, 0, 0.15)' },
});
