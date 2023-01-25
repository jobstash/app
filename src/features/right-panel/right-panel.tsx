import clsx from 'clsx';

import { RouterPush, VoidFn } from '~/core/types';

const rightPanelTabs = [
  {
    label: 'Job Details',
  },
  {
    label: 'Organization',
    segment: 'organization',
  },
  {
    label: 'Project',
    segment: 'project',
  },
  {
    label: 'Repositories',
    segment: 'repositories',
  },
  {
    label: 'Competitors',
    segment: 'competitors',
  },
];

/** UNSTYLED */
const RightPanelTab = ({
  text,
  isActive,
  onClick,
}: {
  text: string;
  isActive: boolean;
  onClick: VoidFn;
}) => (
  <button
    className={clsx(
      'rounded-lg border border-zinc-500 py-2 px-4 hover:bg-zinc-800',
      { 'bg-zinc-700': isActive },
    )}
    onClick={onClick}
  >
    {text}
  </button>
);

/** UNSTYLED */
export const RightPanel = ({
  section,
  idSegment,
  tabSegment,
  push,
}: {
  section: string;
  idSegment: string;
  tabSegment: string;
  push: RouterPush;
}) => (
  <div className="px-6">
    <div className="py-12">
      <h1 className="text-3xl">Uniswap Labs</h1>
      <h3>(TODO)</h3>
    </div>
    <div className="py-8">
      <hr className="h-px border-0 bg-neutral-500" />
    </div>
    <div className="flex space-x-4 py-12">
      {rightPanelTabs.map((tab) => (
        <RightPanelTab
          key={tab.label}
          text={tab.label}
          isActive={tabSegment === tab.segment}
          onClick={() => push(`/${section}/${idSegment}/${tab.segment ?? ''}`)}
        />
      ))}
    </div>
    <h1>Details</h1>
  </div>
);
