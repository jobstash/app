import { useCallback, useMemo } from 'react';

import { Chip } from '@nextui-org/chip';

import { JobPost } from '@jobstash/jobs/core';
import { DevProfileInfo } from '@jobstash/profile/core';
import { omitKeys } from '@jobstash/shared/utils';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useOrgProfileInfoContext } from '@jobstash/profile/state';

import { LogoTitle, Text } from '@jobstash/shared/ui';

export const useApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();
  const { data } = useJobApplicants(profileInfoData?.orgId);

  const applicants = useMemo(
    () =>
      (data ?? []).flatMap((job) =>
        job.applicants.map((applicant) => ({
          ...applicant,
          job: {
            ...omitKeys(job, 'applicants'),
          },
        })),
      ),
    [data],
  );

  const renderCell = useCallback(
    (
      applicant: Applicant,
      columnKey: keyof DevProfileInfo | CustomColumnKeys,
    ) => {
      if (columnKey === 'user') {
        const {
          username,
          avatar,
          email,
          location: { city, country },
        } = applicant;

        // Devs have either username or email;
        const title = username ?? (email as string);
        const location =
          !city && !country
            ? undefined
            : `${city ? `${city}, ` : ''}${country}`;

        return (
          <LogoTitle
            title={title}
            location={location}
            avatarProps={{ src: avatar ?? '', alt: title }}
          />
        );
      }

      if (columnKey === 'availableForWork') {
        const isAvailable = applicant[columnKey];
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

  return {
    isLoading: !profileInfoData || !data,
    applicants,
    renderCell,
    columns,
    centeredSet,
  };
};

type CustomColumnKeys = 'user' | 'job' | 'actions';

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

type Applicant = DevProfileInfo & {
  job: Omit<JobPost, 'organization'>;
};
