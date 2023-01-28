export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;

/** RouterPush type alias for nextjs router.push (simplified) */
export type RouterPush = (
  _url: string,
  _options?: {
    shouldScroll?: boolean;
    shallow?: boolean;
  },
) => void;

/** Possible section segments (based on sidebar) */
export type SectionSegment = 'jobs'; // TODO: add more types

/** Possible tab segments (based on right-panel) */
export type TabsSegment =
  | 'details'
  | 'organization'
  | 'project'
  | 'competitors'
  | 'repositories';

/** Tailwind sizes */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
