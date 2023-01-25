export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;

/** RouterPush type alias for nextjs router.push (simplified) */
export type RouterPush = (_: string) => void;
