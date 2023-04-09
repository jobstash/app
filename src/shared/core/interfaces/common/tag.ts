import type { ReactNode } from 'react';

export interface TagElement {
  /** Main tag text content */
  text: string;
  /** Svg icon element ` */
  icon?: ReactNode;
  /** External url used when clicked */
  link?: string;
  showLinkIcon?: boolean;
}
