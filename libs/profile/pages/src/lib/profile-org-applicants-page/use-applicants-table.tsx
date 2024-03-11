import { useCallback } from 'react';

import { DevProfileInfo } from '@jobstash/profile/core';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useOrgProfileInfoContext } from '@jobstash/profile/state';

export const useApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();
  const { data } = useJobApplicants(profileInfoData?.orgId);

  const applicants = (data ?? []).flatMap((d) => d.applicants);

  const renderCell = useCallback(
    (
      applicant: DevProfileInfo,
      columnKey: keyof DevProfileInfo | CustomColumnKeys,
    ) => {
      if (columnKey === 'actions')
        return (
          <div className="flex w-full items-center justify-center">
            <p>TODO</p>
          </div>
        );

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

type CustomColumnKeys = 'actions';

const columns = [
  { key: 'wallet', label: 'Wallet' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'availableForWork', label: 'Available' },
  { key: 'contact', label: 'Contact' },
  { key: 'location', label: 'Location' },
  { key: 'actions', label: 'Actions' },
];

const centeredSet = new Set(['actions']);
