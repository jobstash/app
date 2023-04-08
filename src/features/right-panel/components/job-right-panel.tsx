import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { activeJobPostAtom } from '~/features/jobs/atoms';
import { Button, CardSet, LogoTitle, Text } from '~/shared/components';
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
    <div className="">
      {/* NOTE: This component needs to be always on top */}
      <div className="absolute top-0" id={ID_TOP_RIGHT_PANEL} />

      {/** RIGHT PANEL HEADER */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex h-10 items-center">
            <LogoTitle
              title={org.name}
              avatarProps={{ src: '', alt: org.name }}
            />
          </div>
          <div className="flex h-6 gap-4">
            {orgTags.map(({ text, icon, link }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        </div>

        <Text color="dimmed">{org.summary}</Text>

        {orgSocials.length > 0 && (
          <div className="flex gap-4">
            {orgSocials.map(({ text, icon, link }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        )}
      </div>

      {/** RIGHT PANEL TABS */}
      <div className="mt-8 flex flex-wrap space-x-2 border-t border-white/10 pt-8">
        {rightPanelTabs.map(({ label, route, isActive }) => (
          <Button
            key={label}
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
      <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5">
        <div className="rounded-3xl bg-darker-gray">
          {cardMap[segments.tab as keyof typeof cardMap]}
        </div>
      </div>
    </div>
  );
};
