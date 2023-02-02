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

/** Tailwind sizes */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
