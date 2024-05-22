/* eslint-disable complexity */
import { useCallback, useMemo, useState } from 'react';

import {
  ArchiveBoxIcon,
  CalendarDaysIcon,
  HeartIcon,
} from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import { Selection } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';

import { JobApplicant } from '@jobstash/jobs/core';
import {
  checkSearchFilterValue,
  getContactLink,
  PreferredContact,
  sanitizeShowcaseUrl,
} from '@jobstash/profile/utils';
import { capitalize } from '@jobstash/shared/utils';

import { useJobApplicants } from '@jobstash/jobs/state';
import {
  useOrgProfileInfoContext,
  useUpdateApplicantList,
} from '@jobstash/profile/state';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';
import { LogoTitle, Text } from '@jobstash/shared/ui';

import { ActionButton } from './action-button';
import { BooleanCell } from './boolean-cell';
import { CommunityCell } from './community-cell';
import { WorkHistory } from './work-history';

export const useApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();

  const [activeList, setActiveList] = useState<
    'all' | 'new' | 'shortlisted' | 'archived'
  >('all');
  const {
    data,
    isFetching,
    isPending: isPendingQuery,
  } = useJobApplicants(profileInfoData?.orgId, activeList);

  const [searchFilter, setSearchFilter] = useState('');

  const [jobSelection, setJobSelection] = useState<JobSelection>({
    input: '',
    selectedKey: null,
    current: null,
  });

  const [page, setPage] = useState(1);

  const onJobSelectionChange = (key: React.Key) => {
    setPage(1);
    setJobSelection(() => {
      const item = jobs.find((job) => job.shortUUID === key);
      return {
        input: item?.title || '',
        selectedKey: key as string | null,
        current: item ?? null,
      };
    });
  };

  const onJobSelectionInputChange = (value: string) => {
    setJobSelection((prev) => ({
      ...prev,
      input: value,
      selectedKey: value === '' ? null : prev.selectedKey,
    }));
  };

  const applicants = useMemo(() => data ?? [], [data]);
  const jobs = useMemo(() => {
    if (applicants.length === 0) return [];

    const jobMap = new Map<string, JobApplicant['job']>();

    for (const applicant of applicants) {
      const { job } = applicant;
      jobMap.set(job.shortUUID, job);
    }

    return [...jobMap.values()];
  }, [applicants]);

  const filteredItems = useMemo(() => {
    if (!searchFilter && !jobSelection.current) return applicants;

    let result = applicants;

    if (jobSelection.current) {
      result = applicants.filter(
        (applicant) =>
          applicant.job.shortUUID === jobSelection.current?.shortUUID,
      );
    }

    if (searchFilter) {
      result = applicants.filter((applicant) =>
        checkSearchFilterValue(
          searchFilter,
          applicant.user.username,
          applicant.user.email,
          applicant.user.location.city,
          applicant.user.location.country,
          applicant.job.title,
          applicant.job.classification,
        ),
      );
    }

    return result;
  }, [applicants, jobSelection, searchFilter]);

  const filteredJobs = useMemo(() => {
    if (!jobSelection.input) return jobs;

    return jobs.filter((job) =>
      checkSearchFilterValue(jobSelection.input, job.title, job.classification),
    );
  }, [jobSelection.input, jobs]);

  const totalPageCount = Math.ceil(filteredItems.length / ROWS_PER_PAGE);

  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchFilter(value);
      setPage(1);
    } else {
      setSearchFilter('');
    }
  }, []);

  const { isPending, mutate } = useUpdateApplicantList({
    orgId: profileInfoData?.orgId ?? '',
    successCb: () => setSelectedApplicants(new Set()),
  });

  const renderCell = useCallback(
    (
      applicant: JobApplicant,
      columnKey: keyof JobApplicant | CustomColumnKeys,
    ) => {
      if (columnKey === 'user') {
        const {
          user: {
            username,
            avatar,
            email,
            location: { city, country },
            contact,
            showcases,
          },
        } = applicant;

        // Devs have either username or email;
        const title = username ?? (email as string);
        const location =
          !city && !country
            ? undefined
            : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${
                country ?? ''
              }`;

        const contactLink = getContactLink(
          contact.preferred as PreferredContact,
          contact.value,
        );

        return (
          <div
            className="flex flex-col gap-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <LogoTitle
              key={title}
              title={title}
              location={location}
              avatarProps={{
                src: avatar ?? '',
                alt: username ?? email ?? '',
                name: username ?? email ?? '',
              }}
            />

            <div className="flex flex-col gap-0.5">
              {contact.value && (
                <div className="flex gap-1">
                  {contactLink ? (
                    <Link
                      href={contactLink}
                      size="sm"
                      underline="hover"
                      className="font-semibold text-white/80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.preferred === 'Email'
                        ? 'Send Email'
                        : `Open ${contact.preferred}`}
                    </Link>
                  ) : (
                    <span>{`Contact: ${contact.value}`}</span>
                  )}
                </div>
              )}

              {username && (
                <Link
                  href={`https://github.com/${username}`}
                  size="sm"
                  underline="hover"
                  className="font-semibold text-white/80 w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Github
                </Link>
              )}

              {showcases.length > 0 &&
                showcases.map(({ id, label, url }) => (
                  <Link
                    key={id}
                    href={sanitizeShowcaseUrl(url)}
                    size="sm"
                    underline="hover"
                    className="font-semibold text-white/80 w-fit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open {label}
                  </Link>
                ))}
            </div>
          </div>
        );
      }

      if (columnKey === 'prevOrgs') {
        const {
          user: { username, workHistory },
        } = applicant;

        if (!username) {
          return <EmptyCellPlaceholder text="None Listed" />;
        }

        return <WorkHistory workHistory={workHistory} />;
      }

      //
      // if (columnKey === 'cryptoVerticals') {
      //   return <EmptyCellPlaceholder text="None Listed" />;
      // }

      if (columnKey === 'skills') {
        const {
          job: { tags },
          user: { skills },
        } = applicant;

        const skillSet = new Set<string>();
        for (const skill of skills) {
          skillSet.add(skill.name);
        }

        const matchingSkills = [];
        for (const { name } of tags) {
          if (skillSet.has(name)) {
            matchingSkills.push(name);
          }
        }

        if (matchingSkills.length === 0) {
          return (
            <Tooltip
              content="Applicant skills did not match job description"
              delay={0}
            >
              <div>
                <EmptyCellPlaceholder
                  isCentered={false}
                  text="No Skills Matched"
                />
              </div>
            </Tooltip>
          );
        }

        return (
          <div className="flex gap-2 w-full flex-wrap max-w-xs py-2">
            {matchingSkills.map((name) => (
              <Chip key={name} color="default" radius="sm">
                {capitalize(name)}
              </Chip>
            ))}
          </div>
        );
      }

      if (columnKey === 'cryptoNative') {
        return <BooleanCell value={applicant.cryptoNative} />;
      }

      //
      // if (columnKey === 'cryptoAdjacent') {
      //   return (
      //     <div className="flex w-full justify-center">
      //       <Chip>
      //         <Text fw="bold">N/A</Text>
      //       </Chip>
      //     </div>
      //   );
      // }

      //
      // if (columnKey === 'oss') {
      //   return <BooleanCell value={applicant.oss} />;
      // }

      if (columnKey === 'attestations') {
        const {
          attestations: { upvotes, downvotes },
        } = applicant;
        return (
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="flex items-center gap-2 justify-end">
              <div className="min-w-[20px]">
                <Text fw="bold">{upvotes ? `${upvotes}x` : 'TBD'}</Text>
              </div>
              <span role="img" aria-label="upvote">
                👍
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div className="min-w-[20px] flex justify-end">
                <Text fw="bold">{downvotes ? `${downvotes}x` : 'TBD'}</Text>
              </div>
              <span role="img" aria-label="downvote">
                👎
              </span>
            </div>
          </div>
        );
      }

      //
      // if (columnKey === 'availableForWork') {
      //   return <BooleanCell value={Boolean(applicant.user.availableForWork)} />;
      // }

      //
      // if (columnKey === 'hired') {
      //   return (
      //     <div className="flex w-full justify-center">
      //       <Button
      //         size="sm"
      //         className="bg-gradient-to-l from-primary to-tertiary"
      //       >
      //         <Text fw="bold">Attest</Text>
      //       </Button>
      //     </div>
      //   );
      // }

      if (columnKey === 'interviewed') {
        return (
          <div className="flex w-full justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-l from-primary to-tertiary"
            >
              <Text fw="bold">Attest</Text>
            </Button>
          </div>
        );
      }

      //
      // if (columnKey === 'fake') {
      //   return (
      //     <div className="flex w-full justify-center">
      //       <Button
      //         size="sm"
      //         className="bg-gradient-to-l from-primary to-tertiary"
      //       >
      //         <Text fw="bold">Attest</Text>
      //       </Button>
      //     </div>
      //   );
      // }

      if (columnKey === 'actions') {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full items-center justify-center">
              <Tooltip content="Calendar Invite" delay={0}>
                <Button isIconOnly>
                  <CalendarDaysIcon className="h-8 w-8" />
                </Button>
              </Tooltip>
              <ActionButton
                orgId={profileInfoData?.orgId}
                wallet={applicant.user.wallet}
                job={applicant.job.shortUUID}
                isPending={isPending}
                mutate={mutate}
                list="shortlisted"
                icon={<HeartIcon className="h-8 w-8" />}
              />
              <ActionButton
                orgId={profileInfoData?.orgId}
                wallet={applicant.user.wallet}
                job={applicant.job.shortUUID}
                isPending={isPending}
                mutate={mutate}
                list="archived"
                icon={<ArchiveBoxIcon className="h-8 w-8" />}
              />
            </div>
          </div>
        );
      }

      if (columnKey === 'cryptoAdjacent') {
        return <EmptyCellPlaceholder isCentered text="None" />;
      }

      if (columnKey === 'organizationHighlights') {
        return <EmptyCellPlaceholder isCentered text="None" />;
      }

      if (columnKey === 'ecosystemActivations') {
        const {
          user: { wallet },
        } = applicant;

        return <CommunityCell wallet={wallet} />;
      }

      if (columnKey === 'job') {
        const {
          job: { title, classification },
        } = applicant;
        return (
          <div className="flex flex-col gap-2">
            <Text size="md" fw="bold">
              {title}
            </Text>
            <Text size="sm" color="dimmed">
              {classification}
            </Text>
          </div>
        );
      }

      return <EmptyCellPlaceholder />;
    },
    [isPending, mutate, profileInfoData?.orgId],
  );

  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(
    new Set(),
  );
  const onTableSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      const allValues = new Set();
      for (const applicant of filteredItems) {
        allValues.add(applicant.user.wallet);
      }

      setSelectedApplicants(allValues as Set<string>);
    } else if ((keys as Set<string>).size > 0) {
      setSelectedApplicants(keys as Set<string>);
    } else {
      setSelectedApplicants(new Set());
    }
  };

  return {
    isLoading: !profileInfoData || !data || isPendingQuery || isFetching,
    totalApplicantCount: data?.length,
    items,
    filteredItems,
    renderCell,
    columns,
    centeredSet,
    searchFilter,
    setSearchFilter,
    onSearchChange,
    page,
    setPage,
    totalPageCount,
    pageRowCount: ROWS_PER_PAGE,
    jobs: filteredJobs,
    jobSelection,
    onJobSelectionChange,
    onJobSelectionInputChange,
    selectedApplicants,
    onTableSelectionChange,
    activeList,
    setActiveList,
    isPending,
    mutate,
  };
};

type JobSelection = {
  input: string;
  selectedKey: string | null;
  current: JobApplicant['job'] | null;
};

type CustomColumnKeys =
  | 'job'
  | 'user'
  | 'prevOrgs'
  | 'skills'
  // | 'cryptoVerticals'
  | 'availableForWork'
  | 'cryptoAdjacent'
  | 'organizationHighlights'
  | 'ecosystemActivations'
  // | 'hired'
  // | 'interviewed'
  // | 'fake'
  | 'actions';

const columns = [
  { key: 'job', label: 'Job' },
  { key: 'user', label: 'User' },
  { key: 'skills', label: 'Skill Match' },
  { key: 'prevOrgs', label: 'Work History' },
  // { key: 'cryptoVerticals', label: 'Crypto Verticals' },
  // { key: 'availableForWork', label: 'Available' },
  { key: 'cryptoNative', label: 'Crypto Native' },
  { key: 'cryptoAdjacent', label: 'Crypto Adjacent' },
  { key: 'organizationHighlights', label: 'Organization Highlights' },
  { key: 'ecosystemActivations', label: 'Ecosystem Activations' },
  // { key: 'oss', label: 'OSS' },
  // { key: 'attestations', label: 'Attestations' },
  // { key: 'hired', label: 'Hired' },
  // { key: 'interviewed', label: 'Interviewed' },
  // { key: 'fake', label: 'Fake' },
  { key: 'actions', label: 'Actions' },
];

const centeredSet = new Set([
  'prevOrgs',
  'cryptoVerticals',
  // 'oss',
  'cryptoNative',
  'cryptoAdjacent',
  'organizationHighlights',
  // 'availableForWork',
  'ecosystemActivations',
  'actions',
  'attestations',
  'hired',
  'interviewed',
  'fake',
]);

const ROWS_PER_PAGE = 20;
