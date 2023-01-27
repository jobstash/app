export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;

interface RouterPushOptions {
  shouldScroll?: boolean;
  shallow?: boolean;
}

/** RouterPush type alias for nextjs router.push (simplified) */
export type RouterPush = (_url: string, _options?: RouterPushOptions) => void;
