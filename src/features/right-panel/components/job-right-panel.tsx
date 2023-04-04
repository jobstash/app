import Image from 'next/image';
import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { activeJobPostAtom } from '~/features/jobs/atoms';
import { JobPost } from '~/features/jobs/core/interfaces';
import { ProjectRightPanel } from '~/features/projects/components';
import { Button, ChainHeading, IconHolder } from '~/shared/components';
import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECT,
} from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';

import { createRightPanelOrgTags } from '../utils';
import { createRightPanelJobTabs } from '../utils/create-right-panel-job-tabs';

import { RightPanelJobCard } from './right-panel-job-card';
import { RightPanelOrgCard } from './right-panel-org-card';
import { RightPanelProjectCard } from './right-panel-project-card';

export const JobRightPanel = () => {
  // Whenever a card is clicked, scroll right-panel to top
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#' + ID_TOP_RIGHT_PANEL);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);
    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  const { segments, push } = useRouteSegments();

  const listing = useAtomValue(activeJobPostAtom);

  if (!listing) return null;

  const { jobpost, organization: org, project } = listing;

  const { orgTags, orgSocials } = createRightPanelOrgTags(org);
  const rightPanelTabs = createRightPanelJobTabs(segments, project);

  const cardMap = {
    [TEXT_ROUTE_TAB_DETAILS]: <RightPanelJobCard job={jobpost} />,
    [TEXT_ROUTE_TAB_ORGANIZATION]: <RightPanelOrgCard org={org} />,
    [TEXT_ROUTE_TAB_PROJECT]: <RightPanelProjectCard project={project} />,
  };

  return (
    <div>
      {/* NOTE: This component needs to be always on top */}
      <div className="text-ivory absolute top-0" id={ID_TOP_RIGHT_PANEL} />

      {/** RIGHT PANEL HEADER */}
      <div>
        <div className="flex items-center space-x-3">
          {/** Note: waiting for backend/middleware to provide org avatars */}

          <ChainHeading avatar="" alt={org.name}>
            {org.name}
          </ChainHeading>
        </div>
        <div className="flex space-x-4 py-4 text-sm">
          {orgTags.map(({ text, iconText, link }) => (
            <IconHolder key={text} link={link} iconText={iconText}>
              {text}
            </IconHolder>
          ))}
        </div>
        <p className="text-sidebarTitle text-sm">{org.summary}</p>
        {orgSocials.length > 0 && (
          <div className="flex space-x-4 py-4 text-sm">
            {orgSocials.map(({ text, iconText, link }) => (
              <IconHolder key={text} link={link} iconText={iconText}>
                {text}
              </IconHolder>
            ))}
          </div>
        )}
      </div>

      {/** RIGHT PANEL TABS */}
      <div className="mt-8 flex flex-wrap space-x-2 border-t border-white/20 pt-8">
        {rightPanelTabs.map(({ label, route, isActive }) => (
          <Button
            key={label}
            /** NOTE: Need gradient border implementation for isActive ("primary" for now) */
            variant="outline"
            isActive={isActive}
            size="md"
            onClick={() => push(route, { shouldScroll: false, shallow: true })}
          >
            {label}
          </Button>
        ))}
      </div>

      {/** RIGHT PANEL CARD */}
      <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-secondary p-1">
        <div className="bg-grey rounded-3xl">
          {cardMap[segments.tab as keyof typeof cardMap]}
        </div>
      </div>
    </div>
  );
};
