import clsx from 'clsx';

import { TEXT_DETAILS } from '~/core/constants';
import { RouteSegments } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';
import { capitalize } from '~/utils/capitalize';

import { Button } from '../unstyled-ui/base/button';

/**
 * If on details tab: omit "s" in section, capitalize then append "Details"
 * Else return label
 * */
const getTabText = (label: string, section: string) =>
  label === capitalize(TEXT_DETAILS)
    ? `${capitalize(section.slice(0, -1))} ${capitalize(TEXT_DETAILS)}`
    : label;

interface Props {
  label: string;
  segments: RouteSegments;
  push: RouterPush;
}

/** UNSTYLED */
export const RightPanelTab = ({ label, segments, push }: Props) => {
  const { section, id, tab } = segments;
  const lowLabel = label.toLowerCase();
  const isActive = tab === lowLabel;

  // We want to append section to label for details tab
  const text = getTabText(label, section);

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
      {text}
    </Button>
  );
};
