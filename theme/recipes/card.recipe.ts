import { defineSlotRecipe } from '@chakra-ui/react';
import { transitions } from '../tokens/transitions';

/**
 * Card slot recipe.
 *
 * Chakra v3 ships `card` as a *slot* recipe (root/header/body/footer/title/
 * description), so this overrides theme.slotRecipes.card - not theme.recipes.
 * The old v2 file used a `container` slot, which no longer exists; it is `root`
 * here. Its token references were also stale (`semantic.border.default`,
 * `gray.50`) and now point at the real semantic tokens.
 */
export const cardRecipe = defineSlotRecipe({
  className: 'madeline-card',
  slots: ['root', 'header', 'body', 'footer', 'title', 'description'],
  base: {
    root: {
      borderRadius: 'md', // 8px
      overflow: 'hidden',
      transition: transitions.normal,
      bg: 'bg.surface',
    },
    header: { p: '6', pb: '4' },
    body: { p: '6' },
    footer: { p: '6', pt: '4' },
    title: { textStyle: 'bodyBold', color: 'text.primary' },
    description: { textStyle: 'caption', color: 'text.tertiary' },
  },
  variants: {
    variant: {
      elevated: {
        root: {
          borderWidth: '1px',
          borderColor: 'border.subtle',
          shadow: 'raised',
          _hover: { shadow: 'overlay' },
        },
      },
      outline: {
        root: {
          borderWidth: '1px',
          borderColor: 'border.subtle',
          _hover: { borderColor: 'border.default' },
        },
      },
      // `subtle` exists in Chakra's built-in card recipe. Registering replaces
      // that recipe outright, so dropping the name would break any consumer.
      subtle: {
        root: { bg: 'bg.warm' },
      },
    },
    size: {
      sm: {
        root: { borderRadius: 'sm' },
        header: { p: '4', pb: '2' },
        body: { p: '4' },
        footer: { p: '4', pt: '2' },
      },
      md: {
        header: { p: '6', pb: '4' },
        body: { p: '6' },
        footer: { p: '6', pt: '4' },
      },
      lg: {
        header: { p: '8', pb: '5' },
        body: { p: '8' },
        footer: { p: '8', pt: '5' },
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'md',
  },
});
