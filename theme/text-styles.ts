import { defineTextStyles } from '@chakra-ui/react';

/**
 * Text styles.
 *
 * Two layers, deliberately separate:
 *   - a bold marketing layer (display / h1 / h2) at 700-800 weight with
 *     negative tracking. The heavy display weight is the brand signature -
 *     never soften it.
 *   - a quieter app layer (appUI / caption) at 14px and 12px for the CMS.
 *
 * Desktop sizes come from the design; the smaller breakpoints scale down so
 * 72px headlines do not overflow a phone.
 */
export const textStyles = defineTextStyles({
  display: {
    value: {
      fontSize: '40px',
      fontWeight: '800',
      lineHeight: '1.05',
      letterSpacing: '-0.03em',
      sm: { fontSize: '48px' },
      md: { fontSize: '60px' },
      lg: { fontSize: '72px' },
    },
  },
  h1: {
    value: {
      fontSize: '34px',
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      sm: { fontSize: '40px' },
      md: { fontSize: '46px' },
      lg: { fontSize: '52px' },
    },
  },
  h2: {
    value: {
      fontSize: '26px',
      fontWeight: '700',
      lineHeight: '1.15',
      letterSpacing: '-0.01em',
      sm: { fontSize: '30px' },
      md: { fontSize: '36px' },
    },
  },
  h3: {
    value: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0',
      md: { fontSize: '24px' },
    },
  },
  body: {
    value: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.6',
      md: { fontSize: '17px' },
    },
  },
  bodyBold: {
    value: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.6',
      md: { fontSize: '17px' },
    },
  },
  /** The app layer - file-browser scale, kept out of the marketing hierarchy. */
  appUI: {
    value: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.5',
    },
  },
  label: {
    value: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
  },
  link: {
    value: {
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '1.6',
      md: { fontSize: '17px' },
    },
  },
  button: {
    value: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
  },
  caption: {
    value: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.4',
    },
  },
  captionBold: {
    value: {
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '1.4',
    },
  },
});
