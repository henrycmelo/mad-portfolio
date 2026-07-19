export const Card = {
  baseStyle: {
    container: {
      borderRadius: 'lg',
      overflow: 'hidden',
      transition: 'base',
    },
    body: {
      p: '6',
    },
    header: {
      p: '6',
      pb: '4',
    },
    footer: {
      p: '6',
      pt: '4',
    },
  },
  variants: {
    elevated: {
      container: {
        bg: 'white',
        boxShadow: 'md',
        _hover: {
          boxShadow: 'lg',
          transform: 'translateY(-4px)',
        },
      },
    },
    outline: {
      container: {
        bg: 'white',
        borderWidth: '1px',
        borderColor: 'semantic.border.default',
        _hover: {
          borderColor: 'semantic.border.hover',
          shadow: 'sm',
        },
      },
    },
    filled: {
      container: {
        bg: 'gray.50',
      },
    },
  },
  defaultProps: {
    variant: 'elevated',
  },
};
