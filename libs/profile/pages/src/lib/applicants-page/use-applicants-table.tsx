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
  NOTE_UPDATE_UNDO_EVENT,
  noteUpdatePayloadAtom,
} from '@jobstash/profile/core';
import { convertFalseStringValuesToNull } from '@jobstash/shared/utils';

import {
  BooleanCell,
  EcosystemActivationsCell,
  NotesCell,
  ShowcaseCell,
  SkillsCell,
  SocialsCell,
  UserCell,
  WorkHistoryCell,
} from '@jobstash/profile/ui';

import { ActionsCell } from './actions-cell';
import { JobCell } from './job-cell';
import { CellProps } from './types';

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
        cellRenderer: (props: CellProps) => (
          <WorkHistoryCell
            username={props.data?.user.username}
            workHistory={props.data?.user.workHistory}
          />
        ),
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
          maxLength: 1000,
          rows: 15,
          cols: 50,
        },
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
        cellRenderer: (props: CellProps) => (
          <EcosystemActivationsCell
            ecosystemActivations={props.data?.ecosystemActivations}
          />
        ),
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

  return {
    gridRef,
    getRowId,
    columnDefs,
    onCellEditingStopped,
  };
};
