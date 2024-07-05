import { useCallback, useMemo, useRef } from 'react';

import { ColDef, GetRowIdFunc } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';
import { convertFalseStringValuesToNull } from '@jobstash/shared/utils';

import {
  ShowcaseCell,
  SkillsCell,
  SocialsCell,
  UserCell,
} from '@jobstash/profile/ui';

import { ActionsCell } from './actions-cell';
import { BooleanCell } from './boolean-cell';
import { EcosystemActivationsCell } from './ecosystem-activation-cell';
import { JobCell } from './job-cell';
import { CellProps } from './types';
import { WorkHistoryCell } from './work-history-cell';

export const useApplicantsTable = (orgId: string) => {
  const gridRef = useRef<AgGridReact>(null);

  const getRowId: GetRowIdFunc<JobApplicant> = useCallback(
    ({ data: { user } }) => user.wallet,
    [],
  );

  const columnDefs: ColDef<JobApplicant>[] = useMemo(
    () => [
      {
        headerName: 'Job',
        cellRenderer: JobCell,
      },
      {
        headerName: 'User',
        cellRenderer: (props: CellProps) => (
          <UserCell user={props.data?.user} />
        ),
        valueGetter: (p) => p.data?.user.username || p.data?.user.email,
        width: 280,
      },
      {
        headerName: 'Work History',
        cellRenderer: WorkHistoryCell,
        width: 320,
      },
      {
        headerName: 'Socials',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <SocialsCell
            socials={{
              ...convertFalseStringValuesToNull(props.data?.user.contact),
              github: props.data?.user.username ?? null,
            }}
          />
        ),
      },
      {
        headerName: 'Showcase',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <ShowcaseCell showcases={props.data?.user.showcases} />
        ),
      },
      {
        headerName: 'Skills',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <SkillsCell
            isMatched
            tags={props.data?.job.tags ?? []}
            skills={props.data?.user.skills}
          />
        ),
      },
      {
        headerName: 'Crypto Native',
        cellRenderer: (props: CellProps) => (
          <BooleanCell value={Boolean(props.data?.cryptoNative)} />
        ),
      },
      {
        headerName: 'Crypto Adjacent',
      },
      {
        headerName: 'Organization Highlights',
      },
      {
        headerName: 'Ecosystem Activations',
        cellRenderer: EcosystemActivationsCell,
      },
      {
        headerName: 'Actions',
        cellRenderer: (props: CellProps) => (
          <ActionsCell orgId={orgId} {...props} />
        ),
        //
        // width: 160,
        // pinned: 'right',
        // lockPinned: true,
      },
    ],
    [orgId],
  );

  return {
    gridRef,
    getRowId,
    columnDefs,
  };
};
