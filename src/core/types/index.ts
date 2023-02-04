export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type RouterPush = (
  url: string,
  options: { shouldScroll?: boolean; shallow?: boolean },
) => void;
