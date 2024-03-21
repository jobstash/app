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
import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';

import { useJobApplicants } from '@jobstash/jobs/state';
import {
  useOrgProfileInfoContext,
  useUpdateApplicantList,
} from '@jobstash/profile/state';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import { ActionButton } from './action-button';

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

  const onJobSelectionChange = (key: React.Key) => {
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
        checkFilterValue(
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
      checkFilterValue(jobSelection.input, job.title, job.classification),
    );
  }, [jobSelection.input, jobs]);

  const [page, setPage] = useState(1);
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
          },
        } = applicant;

        // Devs have either username or email;
        const title = username ?? (email as string);
        const location =
          !city && !country
            ? undefined
            : `${city ? `${city}, ` : ''}${country}`;

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
          </div>
        );
      }

      if (columnKey === 'skills') {
        const {
          user: { skills },
        } = applicant;

        if (skills.length === 0) return null;

        return (
          <div className="flex gap-2 w-full flex-wrap max-w-xs py-2">
            {skills.map(({ id, name }) => (
              <Chip key={id} color="default" radius="sm">
                {name}
              </Chip>
            ))}
          </div>
        );
      }

      if (columnKey === 'availableForWork') {
        const isAvailable = applicant.user.availableForWork;
        const color = isAvailable ? 'success' : 'default';
        const text = isAvailable ? 'Yes' : 'No';
        return (
          <div className="flex w-full justify-center">
            <Chip color={color}>{text}</Chip>
          </div>
        );
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

      if (columnKey === 'actions') {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 w-full items-center justify-center">
              <Tooltip content="Calendar Invite" delay={0}>
                <Button isIconOnly>
                  <CalendarDaysIcon className="h-8 w-8" />
                </Button>
              </Tooltip>
              <ActionButton
                orgId={profileInfoData?.orgId}
                wallet={applicant.user.wallet}
                isPending={isPending}
                mutate={mutate}
                list="shortlisted"
                icon={<HeartIcon className="h-8 w-8" />}
              />
              <ActionButton
                orgId={profileInfoData?.orgId}
                wallet={applicant.user.wallet}
                isPending={isPending}
                mutate={mutate}
                list="archived"
                icon={<ArchiveBoxIcon className="h-8 w-8" />}
              />
            </div>
          </div>
        );
      }

      return null;
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

type CustomColumnKeys =
  | 'user'
  | 'skills'
  | 'job'
  | 'actions'
  | 'availableForWork';

const columns = [
  { key: 'job', label: 'Job' },
  { key: 'user', label: 'User' },
  { key: 'skills', label: 'Skills' },
  { key: 'availableForWork', label: 'Available for Work' },
  { key: 'oss', label: 'OSS' },
  { key: 'interviewed', label: 'Interviewed' },
  { key: 'upcomingTalent', label: 'Upcoming Talent' },
  { key: 'attestations', label: 'Attestations' },
  { key: 'cryptoNative', label: 'Crypto Native' },
  { key: 'actions', label: 'Actions' },
];

const centeredSet = new Set(['availableForWork', 'actions']);

const ROWS_PER_PAGE = 8;

const checkFilterValue = (
  searchValue: string,
  ...applicantValues: (string | null)[]
) => {
  const searchString = searchValue.toLowerCase();
  return applicantValues.some((value) =>
    value?.toLowerCase().includes(searchString),
  );
};

type JobSelection = {
  input: string;
  selectedKey: string | null;
  current: JobApplicant['job'] | null;
};

type PreferredContact = typeof CONTACT_DEFAULT_OPTIONS[number];

const getContactLink = (preferred: PreferredContact, handle: string | null) => {
  if (!handle) return null;

  switch (preferred) {
    case 'Email': {
      return `mailto:${handle}`;
    }

    case 'Telegram': {
      return getContactLinkUrl('telegram.me', handle);
    }

    case 'Twitter': {
      return getContactLinkUrl('twitter.com', handle);
    }

    case 'Discord': {
      return getContactLinkUrl('discord.gg', handle);
    }

    default: {
      return null;
    }
  }
};

const getContactLinkUrl = (domain: string, handle: string) => {
  if (
    handle.toLowerCase().includes('https://') ||
    handle.toLowerCase().includes('http://')
  )
    return handle;
  return `https://${domain}/${handle}`;
};
