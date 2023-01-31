/**
 * Usually listed in org/project info which might contain link.
 * If a link is present, click opens a new window.
 * */
export interface Tag {
  text: string;
  link?: string;

  /** TEMPORARY: solution to randomize tag icon */
  iconKey: string;
}
