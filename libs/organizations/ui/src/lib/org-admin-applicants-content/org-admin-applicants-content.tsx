import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-custom.css';

import { useAtomValue } from 'jotai';

import { ProfileVerifiedOrg } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useJobApplicants } from '@jobstash/jobs/state';

import { ApplicantsTable } from './applicants-table';
import { ApplicantActiveList, applicantsActiveListAtom } from './atoms';
import { NoteUpdatePayloadSyncer } from './note-update-payload-syncer';

interface Props {
  org: ProfileVerifiedOrg;
}

export const OrgAdminApplicantsContent = ({ org }: Props) => {
  const activeList = useAtomValue(applicantsActiveListAtom);

  const { data: rowData, isFetching } = useJobApplicants(
    org.id,
    activeList as ApplicantActiveList,
  );

  return (
    <div
      className={cn({
        'opacity-50 pointer-events-none': isFetching || !rowData,
      })}
    >
      <ApplicantsTable orgId={org.id} rowData={rowData} />
      <NoteUpdatePayloadSyncer />
    </div>
  );
};
