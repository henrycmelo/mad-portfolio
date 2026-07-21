import { defineRecipe } from '@chakra-ui/react';

/**
 * Heading recipe.
 *
 * Translated from the old v2 `theme/components/heading.ts`, whose `color`
 * pointed at `semantic.text.primary` - a token path that does not exist here.
 *
 * The size scale deliberately covers the same xs..7xl range Chakra ships with.
 * Registering a recipe *replaces* the built-in one, so a shorter list would
 * silently delete sizes from every <Heading> in the app.
 *
 * Most headings on the site use `textStyle="h1"|"h2"|"h3"` instead; this covers
 * the plain Chakra <Heading> component.
 */
export const headingRecipe = defineRecipe({
  className: 'madeline-heading',
  base: {
    fontFamily: 'heading',
    fontWeight: 'bold',
    color: 'text.primary',
    lineHeight: 'tight',
    letterSpacing: 'tighter',
  },
  variants: {
    size: {
      xs: { fontSize: 'xs' },
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
      xl: { fontSize: 'xl' },
      '2xl': { fontSize: '2xl' },
      '3xl': { fontSize: '3xl' },
      '4xl': { fontSize: '4xl' },
      '5xl': { fontSize: '5xl' },
      '6xl': { fontSize: '6xl' },
      '7xl': { fontSize: '7xl' },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});
