import { tagIconMap } from '../constants';

/**
 * Usually listed in org/project info which might contain link.
 * If a link is present, click opens a new window.
 * */
export interface Tag {
  text: string;
  iconKey: keyof typeof tagIconMap;
  link?: string;
}
