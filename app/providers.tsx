'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme';

/**
 * Chakra + Emotion, wired for the App Router.
 *
 * Emotion knows nothing about React Server Components: left alone it injects
 * <style> tags into the markup as it renders on the server, then inserts the
 * same styles into <head> on the client. The two trees disagree and React
 * reports
 *
 *   "Hydration failed because the server rendered HTML didn't match the client"
 *
 * pointing at a `<style data-emotion="css-global ...">` where a `<div>` was
 * expected.
 *
 * `useServerInsertedHTML` is the App Router's hook for exactly this: whatever
 * Emotion inserted during a server render is collected and flushed into <head>
 * as a single tag, so both sides see the same tree.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const emotionCache = createCache({ key: 'css' });
    // Stops Emotion emitting its own inline <style> tags as it renders, which
    // is what produced the mismatched nodes.
    emotionCache.compat = true;
    return emotionCache;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
