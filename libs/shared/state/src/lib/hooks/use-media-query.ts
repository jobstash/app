import { useCallback, useEffect, useState } from 'react';

const MEDIA_QUERY = {
  SM: '(max-width: 639px)' as const,
  MD: '(min-width: 640px)' as const,
  LG: '(min-width: 1280px)' as const,
};
type MediaQueryValues = typeof MEDIA_QUERY[keyof typeof MEDIA_QUERY];

/**
 * Match query using window object
 * @param query media query e.g. "(min-width: 600px)"
 * @returns `true` if query match, otherwise false.
 */
const getMatches = (query: MediaQueryValues | string): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  return false;
};

/**
 *
 * @param query {@link MEDIA_QUERY} values
 * @param ssrDefault default value returned during ssr
 * @returns `true` if query match otherwise `false`
 */
export const useMediaQuery = (
  query: MediaQueryValues | string,
  ssrDefault?: boolean,
): boolean => {
  const [matches, setMatches] = useState<boolean>(Boolean(ssrDefault));

  const handleChange = useCallback(
    () => setMatches(getMatches(query)),
    [query],
  );

  useEffect(() => {
    handleChange();

    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [handleChange, query]);

  if (typeof window === 'undefined') return Boolean(ssrDefault);

  return matches;
};

/**
 * @param ssrDefault default value returned during ssr
 * @returns `true` on mobile else `false`
 */
export const useIsMobile = (ssrDefault?: boolean) =>
  useMediaQuery(MEDIA_QUERY.SM, ssrDefault);

/**
 * @param ssrDefault default value returned during ssr
 * @returns `true` on tablet else `false`
 */
export const useIsTablet = (ssrDefault?: boolean) =>
  useMediaQuery(MEDIA_QUERY.MD, ssrDefault);

/**
 * @param ssrDefault default value returned during ssr
 * @returns `true` on desktop else `false`
 */
export const useIsDesktop = (ssrDefault?: boolean) =>
  useMediaQuery(MEDIA_QUERY.LG, ssrDefault);
