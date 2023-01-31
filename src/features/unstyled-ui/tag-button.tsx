import type { MouseEventHandler, ReactNode } from 'react';

import { Button } from './base/button';
import { LinkTagIcon } from './icons';

interface Props {
  /** Tag main content  */
  text: ReactNode;

  /** Left Icon */
  icon?: ReactNode;

  /** External link */
  link?: string;

  /** Click handler */
  onClick?: MouseEventHandler;
}

/**
 * This component is used to display a tag:
 * 	- uses `Button` component underneath
 * 	- can have either left/right button
 * 	- if link: clickable + right external-link icon
 * 	- 	 else: "subtle" button type
 */
export const TagButton = ({ text, icon, link, onClick }: Props) => (
  <Button
    size="sm"
    left={icon}
    right={link ? <LinkTagIcon /> : undefined}
    kind={link ? 'default' : 'subtle'} // Tags with external link should appear clickable.
    textProps={{ size: 'md' }}
    onClick={onClick}
  >
    {text}
  </Button>
);
