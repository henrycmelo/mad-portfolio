export const Button = {
  baseStyle: {
    fontWeight: 'semibold',
    borderRadius: 'md',
    transition: 'base',
    _focus: {
      boxShadow: 'outline',
    },
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: '4',
      py: '2',
      h: '8',
    },
    md: {
      fontSize: 'md',
      px: '6',
      py: '3',
      h: '10',
    },
    lg: {
      fontSize: 'lg',
      px: '8',
      py: '4',
      h: '12',
    },
  },
  variants: {
    primary: {
      bg: 'brand.primary.900',
      color: 'white',
      _hover: {
        bg: 'brand.primary.800',
        transform: 'translateY(-2px)',
        shadow: 'md',
      },
      _active: {
        bg: 'brand.primary.700',
        transform: 'translateY(0)',
      },
    },
    secondary: {
      bg: 'brand.secondary.500',
      color: 'white',
      _hover: {
        bg: 'brand.secondary.600',
        transform: 'translateY(-2px)',
        shadow: 'md',
      },
      _active: {
        bg: 'brand.secondary.700',
        transform: 'translateY(0)',
      },
    },
    outline: {
      borderWidth: '2px',
      borderColor: 'brand.primary.900',
      color: 'brand.primary.900',
      bg: 'transparent',
      _hover: {
        bg: 'brand.primary.50',
      },
      _active: {
        bg: 'brand.primary.100',
      },
    },
    ghost: {
      bg: 'transparent',
      color: 'brand.primary.900',
      _hover: {
        bg: 'brand.primary.50',
      },
      _active: {
        bg: 'brand.primary.100',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
