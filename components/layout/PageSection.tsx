import { Box } from '@chakra-ui/react';

/**
 * One homepage section.
 *
 * Mirrors the admin shell's container: outer padding on the full-width band,
 * inner `maxW` + `mx="auto"` so content stays measured on wide screens instead
 * of stretching edge to edge. Keeping it in one place means every section
 * lines up - which is what the admin was getting right and the public page
 * was not.
 *
 * The width is the marketing container from the design guide (1200px); the
 * admin uses a narrower 900px because forms read better tight.
 */
export const PAGE_MAX_WIDTH = '1200px';

type Spacing = string | Record<string, string>;

interface PageSectionProps {
  id: string;
  children: React.ReactNode;
  /** Landing needs extra top padding to clear the fixed mobile menu. */
  pt?: Spacing;
  pb?: Spacing;
}

export function PageSection({ id, children, pt = '16', pb = '16' }: PageSectionProps) {
  return (
    <Box as="section" id={id} pt={pt} pb={pb} px={{ base: '6', md: '10', lg: '12' }}>
      <Box maxW={PAGE_MAX_WIDTH} mx="auto" w="full">
        {children}
      </Box>
    </Box>
  );
}
