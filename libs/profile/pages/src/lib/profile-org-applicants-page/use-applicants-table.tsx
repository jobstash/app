import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import { Chip } from '@nextui-org/chip';
import { Selection } from '@nextui-org/react';

import { JobApplicant } from '@jobstash/jobs/core';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useOrgProfileInfoContext } from '@jobstash/profile/state';

import { LogoTitle, Text } from '@jobstash/shared/ui';

export const useApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();
  const { data } = useJobApplicants(profileInfoData?.orgId);

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
          },
        } = applicant;

        // Devs have either username or email;
        const title = username ?? (email as string);
        const location =
          !city && !country
            ? undefined
            : `${city ? `${city}, ` : ''}${country}`;

        return (
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
          <div className="flex w-full items-center justify-center">
            <p>TODO</p>
          </div>
        );
      }

      return <pre>{JSON.stringify(applicant[columnKey])}</pre>;
    },
    [],
  );

  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(
    new Set(),
  );
  const onTableSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      const allValues = new Set();
      for (const applicant of filteredItems) {
        allValues.add(applicant.user.username ?? applicant.user.email);
      }

      setSelectedApplicants(allValues as Set<string>);
    } else if ((keys as Set<string>).size > 0) {
      setSelectedApplicants(keys as Set<string>);
    } else {
      setSelectedApplicants(new Set());
    }
  };

  return {
    isLoading: !profileInfoData || !data,
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
  };
};

type CustomColumnKeys = 'user' | 'job' | 'actions' | 'availableForWork';

const columns = [
  { key: 'user', label: 'User' },
  { key: 'job', label: 'Job' },
  { key: 'availableForWork', label: 'Available for Work' },
  // { key: 'wallet', label: 'Wallet' },
  // { key: 'avatar', label: 'Avatar' },
  // { key: 'username', label: 'Username' },
  // { key: 'email', label: 'Email' },
  // { key: 'availableForWork', label: 'Available' },
  // { key: 'contact', label: 'Contact' },
  // { key: 'location', label: 'Location' },
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
