import { rightPanelTabs, TEXT_DETAILS } from '~/core/constants';
import { RouteSegments } from '~/core/interfaces';
import { RouterPush } from '~/core/types';
import { useRootContext } from '~/hooks/use-root-context';

import { RightPanelHeader } from './right-panel-header';
import { JobDetails } from './right-panel-job-details';
import { RightPanelTab } from './right-panel-tab';

interface Props {
  segments: RouteSegments;
  push: RouterPush;
}

/** UNSTYLED */
export const RightPanel = ({ segments, push }: Props) => {
  const { activeCards } = useRootContext();

  const sectionDetailsMap = {
    details: <JobDetails job={activeCards.jobs?.job} />,
  };

  return (
    <div className="hide-scrollbar sticky top-0 max-h-screen overflow-y-scroll px-6">
      {activeCards.jobs?.org && (
        <RightPanelHeader org={activeCards.jobs?.org} />
      )}

      <hr className="h-px border-0 bg-neutral-500" />

      <div className="flex space-x-4 py-10">
        {rightPanelTabs.map((tab) => (
          <RightPanelTab
            key={tab}
            label={tab}
            segments={segments}
            push={push}
          />
        ))}
      </div>

      {sectionDetailsMap[segments.tab as keyof typeof sectionDetailsMap]}
    </div>
  );
};
