import type { TagIconFilename } from '../../types';

export interface TagElement {
  /** Main tag text content */
  text: string;
  /** Svg icon filename used for ` */
  iconText?: TagIconFilename;
  /** External url used when clicked */
  link?: string;
}
