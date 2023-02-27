import Image from 'next/image';
import { useEffect } from 'react';

import { Button, IconHolder } from '~/shared/components';
import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  TEXT_RIGHT_TAB_DETAILS,
  TEXT_RIGHT_TAB_ORGANIZATION,
  TEXT_RIGHT_TAB_PROJECTS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECTS,
} from '~/shared/core/constants';
import type {
  Organization,
  RightPanelTab,
  RouteSegments,
  TagElement,
} from '~/shared/core/interfaces';
import type { RouteTab } from '~/shared/core/types';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString } from '~/shared/utils';

import { JobPost } from '../core/interfaces';
import { createJobRightPanelDescriptions, createJobTags } from '../utils';

interface Props {
  listing: JobPost;
}

const createOrgTags = (org: Organization) => {
  const {
    url,
    location,
    teamSize,
    githubOrganization,
    twitter,
    telegram,
    discord,
    linkedin,
  } = org;

  const orgTags: TagElement[] = [
    {
      text: 'Website',
      iconText: 'website',
      link: url,
    },
    {
      text: location,
      iconText: 'location',
    },
    {
      text: `Team Size: ${teamSize}`,
      iconText: 'users-three',
    },
  ];

  const orgSocials: TagElement[] = [
    {
      text: 'Github',
      iconText: 'github',
      link: githubOrganization,
    },
  ];

  if (twitter)
    orgSocials.push({ text: 'Twitter', iconText: 'twitter', link: twitter });

  if (telegram)
    orgSocials.push({ text: 'Telegram', iconText: 'telegram', link: telegram });

  // **Note**: waiting for backend/middleware to implement "Docs"

  if (discord)
    orgSocials.push({ text: 'Discord', iconText: 'discord', link: discord });

  if (linkedin)
    orgSocials.push({ text: 'LinkedIn', iconText: 'linkedin', link: linkedin });

  return { orgTags, orgSocials };
};

/**
 * Create right panel tabs with data ready to be rendered
 * @param label - text appearing in tab button
 * @param tabRoute - tab segment associated with label
 * @param segment - obtained from `useRouteSegments` hook
 * @see {@link RightPanelTab}
 */
const createRightPanelTab = (
  label: string,
  tabRoute: RouteTab,
  { section, key, tab }: RouteSegments,
): RightPanelTab => ({
  label,
  route: createRouteString(section, key, tabRoute),
  isActive: tab === tabRoute,
});

const createRightPanelTabs = (segments: RouteSegments): RightPanelTab[] => [
  createRightPanelTab(
    `Job ${TEXT_RIGHT_TAB_DETAILS}`,
    TEXT_ROUTE_TAB_DETAILS,
    segments,
  ),
  createRightPanelTab(
    TEXT_RIGHT_TAB_ORGANIZATION,
    TEXT_ROUTE_TAB_ORGANIZATION,
    segments,
  ),
  createRightPanelTab(
    TEXT_RIGHT_TAB_PROJECTS,
    TEXT_ROUTE_TAB_PROJECTS,
    segments,
  ),
  // **Note**: waiting for backend/middleware to implement "Repositories"
  // **Note**: waiting for backend/middleware to implement "Competitors"
];

export const JobRightPanel = ({
  listing: { jobpost, organization: org, technologies, categories, project },
}: Props) => {
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

  const { jobTitle } = jobpost;
  const tags = createJobTags(jobpost);
  const descriptions = createJobRightPanelDescriptions(jobpost);
  const { orgTags, orgSocials } = createOrgTags(org);
  const rightPanelTabs = createRightPanelTabs(segments);

  return (
    <div>
      {/* NOTE: This component needs to be always on top */}
      <div className="text-ivory" id={ID_TOP_RIGHT_PANEL} />

      {/** RIGHT PANEL HEADER */}
      <div>
        <div className="flex items-center space-x-3">
          {/** Note: waiting for backend/middleware to provide org avatars (Uniswap labs for now)  */}
          <Image
            src="/icons/orgs/Uniswap Labs.png"
            width="32"
            height="32"
            alt={org.name}
          />
          <h3 className="font-semibold">{org.name}</h3>
        </div>
        <div className="flex space-x-4 py-4 text-sm">
          {orgTags.map(({ text, iconText, link }) => (
            <IconHolder key={text} link={link} icon={iconText}>
              {text}
            </IconHolder>
          ))}
        </div>
        <p className="text-sm text-sidebarTitle">{org.summary}</p>
        <div className="flex space-x-4 py-4 text-sm">
          {orgSocials.map(({ text, iconText, link }) => (
            <IconHolder key={text} link={link} icon={iconText}>
              {text}
            </IconHolder>
          ))}
        </div>
      </div>

      {/** RIGHT PANEL TABS */}
      <div className="mt-8 flex flex-wrap space-x-2 border-t border-white/20 pt-8">
        {rightPanelTabs.map(({ label, route, isActive }) => (
          <Button
            key={label}
            /** NOTE: Need gradient border implementation for isActive ("primary" for now) */
            kind={isActive ? 'primary' : 'outlined'}
            size="md"
            onClick={() => push(route, { shouldScroll: false, shallow: true })}
          >
            {label}
          </Button>
        ))}
      </div>

      {/** RIGHT PANEL JOB CARD */}
      <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-secondary p-1">
        <div className="rounded-3xl bg-grey">
          <div className="p-6">
            <h2 className="text-xl font-medium">{jobTitle}</h2>

            <div className="flex space-x-8 border-b border-white/5 pt-3 pb-4 text-sm">
              {tags.map(({ text, link, iconText }) => (
                <IconHolder key={text} link={link} icon={iconText}>
                  {text}
                </IconHolder>
              ))}
            </div>

            <div className="flex flex-wrap space-x-2 border-b border-white/20 pb-6">
              <Button>Apply for this job</Button>
            </div>

            <div className="space-y-4 pt-4">
              {descriptions.map((d) => (
                <div key={d.label} className="">
                  <p className="text-md text-white">{d.label}</p>
                  <p className="text-sm text-sidebarTitle">{d.desc}</p>
                </div>
              ))}
            </div>

            {/** Note: Still waiting for backend/middleware to finalize project hardskills */}
            {/* <div>
              <div>
                <p>Hard Skills</p>
                <p>These are technical skills required for the job</p>
              </div>
              {Object.entries(skills).map(([k, v], i) => (
                <div key={k}>
                  <span>{hardSkillTitles[i]}</span>
                  <p>{JSON.stringify(v)}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
