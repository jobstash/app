import { useAtomValue } from 'jotai';

import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';

import { activeOrgJobAtom } from '@jobstash/organizations/state';

import {
  RightPanel,
  RightPanelCardBorder,
  RightPanelCta,
  RightPanelJobCardDescriptions,
  RightPanelJobCardSets,
  RightPanelJobCardSkills,
} from '@jobstash/right-panel/ui';
import { Button, Heading } from '@jobstash/shared/ui';

export const OrgJobRightPanel = () => {
  const activeJob = useAtomValue(activeOrgJobAtom);

  if (!activeJob) return null;

  const { title, organization, tags } = activeJob;

  return (
    <div id={RIGHT_PANEL_WRAPPER_ID}>
      <RightPanel
        hideMenu
        org={organization}
        tabs={
          <div className="pointer-events-none">
            <Button isActive variant="outline" size="md">
              Job Details
            </Button>
          </div>
        }
        backButton={null}
      >
        <RightPanelCardBorder>
          <div className="flex flex-col gap-y-4 p-6">
            <div className="flex flex-col items-start gap-y-4">
              <div className="flex h-fit w-full items-center justify-between gap-2 relative">
                <Heading size="md" fw="semibold">
                  {title}
                </Heading>
              </div>

              <RightPanelJobCardSets jobCardSet={activeJob} />

              <div className="pointer-events-none">
                <RightPanelCta text="Apply Directly" onClick={() => null} />
              </div>
            </div>

            <div className="flex h-4 flex-col justify-center">
              <hr className="border-t border-white/10" />
            </div>

            <RightPanelJobCardDescriptions jobInfo={activeJob} />

            <RightPanelJobCardSkills tags={tags} />
          </div>
        </RightPanelCardBorder>
      </RightPanel>
    </div>
  );
};
