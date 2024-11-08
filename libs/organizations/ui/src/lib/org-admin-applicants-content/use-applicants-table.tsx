/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import { JobApplicant } from '@jobstash/jobs/core';
import {
  LinkedAccounts,
  NOTE_UPDATE_UNDO_EVENT,
  UserWorkHistory,
} from '@jobstash/shared/core';

import {
  BooleanCell,
  EcosystemActivationsCell,
  JobCell,
  NotesCell,
  ShowcaseCell,
  SkillsCell,
  SocialsCell,
  UserCell,
  WorkHistoryCell,
} from '@jobstash/shared/ui';

import { noteUpdatePayloadAtom } from './atoms';
import { JobApplicantActionsCell } from './job-applicant-actions-cell';
import { CellProps } from './types';

export const useApplicantsTable = (orgId: string) => {
  const gridRef = useRef<AgGridReact>(null);

  const getRowId: GetRowIdFunc<JobApplicant> = useCallback(
    ({ data: { user, job } }) => `${user.wallet}-${job.shortUUID}`,
    [],
  );

  const columnDefs: ColDef<JobApplicant>[] = useMemo(
    () => [
      {
        headerName: 'Job',
        width: 280,
        cellRenderer: JobCell,
        getQuickFilterText(p) {
          if (!p.data) return '';
          const {
            job: { title, classification, shortUUID },
          } = p.data;
          return `${title} ${classification} ${shortUUID}`;
        },
      },
      {
        headerName: 'User',
        cellRenderer(props: CellProps) {
          const user = props.data?.user;
          if (!user) return null;

          return <UserCell user={user} />;
        },
        valueGetter: (p) =>
          p.data?.user.name || p.data?.user.linkedAccounts.email,
        width: 320,
        getQuickFilterText(p) {
          if (!p.data) return '';
          const {
            user: {
              name,
              wallet,
              location: { city, country },
              linkedAccounts,
            },
          } = p.data;
          return `${name} ${wallet} ${city} ${country} ${getLinkedAccountsString(
            linkedAccounts,
          )}`;
        },
      },
      {
        headerName: 'Work History',
        cellRenderer: (props: CellProps) => (
          <WorkHistoryCell workHistory={props.data?.user.workHistory} />
        ),
        width: 420,
        autoHeight: true,
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.user.workHistory
            .flatMap((w) => [w.name, ...w.repositories.map((r) => r.name)])
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) => (p.data ? p.data.user.workHistory : []),
        comparator(workHistoryA, workHistoryB) {
          const repoCountA = getWorkHistoryRepoCount(workHistoryA);
          const repoCountB = getWorkHistoryRepoCount(workHistoryB);
          if (repoCountA === repoCountB) return 0;
          return repoCountA - repoCountB;
        },
      },
      {
        headerName: 'Socials',
        width: 320,
        autoHeight: true,
        cellRenderer: (props: CellProps) => (
          <SocialsCell
            alternateEmails={props.data?.user.alternateEmails}
            linkedAccounts={props.data?.user.linkedAccounts}
          />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return Object.entries(p.data.user.linkedAccounts)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key} ${value}`)
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) =>
          p.data ? { ...p.data.user.linkedAccounts } : undefined,
        comparator(contactA, contactB) {
          const countA = Object.values(contactA).filter(Boolean).length;
          const countB = Object.values(contactB).filter(Boolean).length;
          return countA - countB;
        },
      },
      {
        headerName: 'Showcase',
        width: 320,
        autoHeight: true,
        cellRenderer: (props: CellProps) => (
          <ShowcaseCell showcases={props.data?.user.showcases} />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.user.showcases
            .map(({ label, url }) => `${label} ${url}`)
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) => p.data?.user.showcases,
        comparator: (showcaseA, showcaseB) =>
          showcaseA.length - showcaseB.length,
      },
      {
        headerName: 'Skills',
        width: 320,
        autoHeight: true,
        cellRenderer: (props: CellProps) => (
          <SkillsCell
            tags={props.data?.job.tags ?? []}
            skills={props.data?.user.skills}
          />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.user.skills.map((s) => s.name).join(' ');
        },
        sortable: true,
        valueGetter: (p) => p.data?.user.skills,
        comparator: (skillsA, skillsB) => skillsA.length - skillsB.length,
      },
      {
        headerName: 'Job Matched Skills',
        width: 320,
        autoHeight: true,
        cellRenderer: (props: CellProps) => (
          <SkillsCell
            isMatched
            tags={props.data?.job.tags ?? []}
            skills={props.data?.user.skills}
          />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.user.skills.map((s) => s.name).join(' ');
        },
        sortable: true,
        valueGetter: (p) => p.data?.user.skills,
        comparator: (skillsA, skillsB) => skillsA.length - skillsB.length,
      },
      {
        headerName: 'Notes',
        width: 320,
        valueGetter: (p) => p.data?.note,
        valueSetter(p) {
          p.data.note = p.newValue;
          return true;
        },
        cellRenderer: (props: CellProps) => (
          <NotesCell note={props.data?.note} />
        ),
        cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' },
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
          maxLength: 20_000,
          rows: 15,
          cols: 50,
        },
        sortable: true,
        comparator(noteA, noteB) {
          if (noteA === noteB) return 0;
          return (noteA || '').length - (noteB || '').length;
        },
      },
      {
        headerName: 'Crypto Native',
        cellRenderer: (props: CellProps) => (
          <BooleanCell value={Boolean(props.data?.cryptoNative)} />
        ),
        sortable: true,
        valueGetter: (p) => p.data?.cryptoNative,
        comparator(boolA, boolB) {
          if (boolA === boolB) return 0;
          return boolA ? -1 : 1;
        },
      },
      {
        headerName: 'Crypto Adjacent',
        cellRenderer: (props: CellProps) => (
          <BooleanCell value={Boolean(props.data?.cryptoAdjacent)} />
        ),
        sortable: true,
        valueGetter: (p) => p.data?.cryptoAdjacent,
        comparator(boolA, boolB) {
          if (boolA === boolB) return 0;
          return boolA ? -1 : 1;
        },
      },
      {
        headerName: 'Organization Highlights',
      },
      {
        headerName: 'Ecosystem Activations',
        cellRenderer: (props: CellProps) => (
          <EcosystemActivationsCell
            ecosystemActivations={props.data?.ecosystemActivations}
          />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.ecosystemActivations.join(' ');
        },
        valueGetter: (p) => p.data?.ecosystemActivations,
        sortable: true,
        comparator: (activationsA, activationsB) =>
          activationsA.length - activationsB.length,
      },
      {
        headerName: 'Actions',
        cellRenderer: (props: CellProps) => (
          <JobApplicantActionsCell orgId={orgId} {...props} />
        ),
      },
    ],
    [orgId],
  );

  const setNotePayload = useSetAtom(noteUpdatePayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<JobApplicant>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      if (data && newValue && oldValue !== newValue) {
        setNotePayload({ wallet: data.user.wallet, note: newValue });
      }
    },
    [setNotePayload],
  );

  // Handle revert edit
  useEffect(() => {
    const handleUndoEvent: EventListener = () => {
      gridRef.current!.api.undoCellEditing();
    };

    window.addEventListener(NOTE_UPDATE_UNDO_EVENT, handleUndoEvent);

    return () => {
      window.removeEventListener(NOTE_UPDATE_UNDO_EVENT, handleUndoEvent);
    };
  }, []);

  const onChangeQuickFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      gridRef.current!.api.setGridOption('quickFilterText', e.target.value);
    },
    [],
  );

  return {
    gridRef,
    getRowId,
    columnDefs,
    onCellEditingStopped,
    onChangeQuickFilter,
  };
};

const getLinkedAccountsString = (linkedAccounts: LinkedAccounts): string =>
  [
    linkedAccounts.github ?? '',
    linkedAccounts.email ?? '',
    linkedAccounts.google ?? '',
    linkedAccounts.telegram ?? '',
    linkedAccounts.farcaster ?? '',
    linkedAccounts.discord ?? '',
    linkedAccounts.twitter ?? '',
    linkedAccounts.apple ?? '',
    ...linkedAccounts.wallets,
  ]
    .filter(Boolean)
    .join(' ');

const getWorkHistoryRepoCount = (workHistory: UserWorkHistory[]) =>
  workHistory.reduce(
    (sum, work) => sum + (work.repositories ? work.repositories.length : 0),
    0,
  );
