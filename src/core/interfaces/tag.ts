import type { ReactNode } from 'react';

export interface Tag {
  text: string;
  link?: string;
}

export interface TagElement extends Tag {
  icon?: ReactNode;
}
