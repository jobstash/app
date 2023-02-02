import type { Listing, RouteSegments } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';
import { capitalize } from '~/utils/capitalize';

import { Button } from '../unstyled-ui/base/button';

import type { RightPanelTabLabel } from './types';

interface Props {
  label: RightPanelTabLabel;
  segments: RouteSegments;
  push: RouterPush;
  activeListing: Listing;
}

/* Formats tab label into singular or plural + count */
const formatTabLabel = (
  label: RightPanelTabLabel,
  section: RouteSegments['section'],
  activeListing: Listing,
) => {
  // Handle 'Details' use case where we append section name
  if (label === 'Details') {
    return `${capitalize(section).slice(0, -1)} ${label}`;
  }

  // Organization does not have plural (special case)
  if (label === 'Organization') return label;

  const arr = activeListing[label.toLowerCase() as keyof Listing] as [];

  // Return plural case w/ count otherwise remove 's' from label
  return `${label} (${arr.length})`;
};

export const RightPanelTab = ({
  label,
  segments,
  push,
  activeListing,
}: Props) => {
  const { section, id, tab } = segments;
  const lowLabel = label.toLowerCase();
  const isActive = tab === lowLabel;

  // Clicking a tab updates to correct route
  const onClick = () =>
    push(`/${section}/${id}/${lowLabel}`, { shouldScroll: false });

  return (
    <Button
      isActive={isActive}
      size="md"
      textProps={{ size: 'sm', fw: 'regular' }}
      onClick={onClick}
    >
      {formatTabLabel(label, section, activeListing)}
    </Button>
  );
};
