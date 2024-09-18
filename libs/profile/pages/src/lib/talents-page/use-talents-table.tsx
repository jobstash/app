/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import {
  DevTalent,
  NOTE_UPDATE_UNDO_EVENT,
  noteUpdatePayloadAtom,
} from '@jobstash/profile/core';
import { getWorkHistoryRepoCount } from '@jobstash/profile/utils';
import { convertFalseStringValuesToNull } from '@jobstash/shared/utils';

import {
  BooleanCell,
  EcosystemActivationsCell,
  NotesCell,
  // NotesCell,
  ShowcaseCell,
  SkillsCell,
  SocialsCell,
  UserCell,
  WorkHistoryCell,
} from '@jobstash/profile/ui';

type CellProps = CustomCellRendererProps<DevTalent>;

export const useTalentsTable = () => {
  const gridRef = useRef<AgGridReact>(null);

  const getRowId: GetRowIdFunc<DevTalent> = useCallback(
    ({ data: { wallet } }) => wallet,
    [],
  );

  const columnDefs: ColDef<DevTalent>[] = useMemo(
    () => [
      {
        headerName: 'User',
        cellRenderer(props: CellProps) {
          if (!props.data) return null;
          const { wallet, avatar, username, email, location } = props.data;
          return (
            <UserCell
              user={{
                wallet,
                avatar,
                username,
                email,
                location,
              }}
            />
          );
        },
        valueGetter: (p) => p.data?.username || p.data?.email,
        width: 280,
        getQuickFilterText(p) {
          if (!p.data) return '';
          const {
            username,
            email,
            location: { city, country },
          } = p.data;
          return `${username} ${email} ${city} ${country}`;
        },
      },
      {
        headerName: 'Work History',
        cellRenderer: (props: CellProps) => (
          <WorkHistoryCell
            username={props.data?.username}
            workHistory={props.data?.workHistory}
          />
        ),
        width: 320,
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.workHistory
            .flatMap((w) => [w.name, ...w.repositories.map((r) => r.name)])
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) => (p.data ? p.data.workHistory : []),
        comparator(workHistoryA, workHistoryB) {
          const repoCountA = getWorkHistoryRepoCount(workHistoryA);
          const repoCountB = getWorkHistoryRepoCount(workHistoryB);
          if (repoCountA === repoCountB) return 0;
          return repoCountA - repoCountB;
        },
      },
      {
        headerName: 'Socials',
        width: 240,
        cellRenderer: (props: CellProps) => (
          <SocialsCell
            socials={{
              ...convertFalseStringValuesToNull(props.data?.contact),
              github: props.data?.username ?? null,
            }}
          />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return Object.entries(p.data.contact)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key} ${value}`)
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) =>
          p.data ? { github: p.data.username, ...p.data.contact } : undefined,
        comparator(contactA, contactB) {
          const countA = Object.values(contactA).filter(Boolean).length;
          const countB = Object.values(contactB).filter(Boolean).length;
          console.log({ countA, contactA, countB, contactB });
          return countA - countB;
        },
      },
      {
        headerName: 'Showcase',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <ShowcaseCell showcases={props.data?.showcases} />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.showcases
            .map(({ label, url }) => `${label} ${url}`)
            .join(' ');
        },
        sortable: true,
        valueGetter: (p) => p.data?.showcases,
        comparator: (showcaseA, showcaseB) =>
          showcaseA.length - showcaseB.length,
      },
      {
        headerName: 'Skills',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <SkillsCell isMatched={false} skills={props.data?.skills} />
        ),
        getQuickFilterText(p) {
          if (!p.data) return '';
          return p.data.skills.map((s) => s.name).join(' ');
        },
        sortable: true,
        valueGetter: (p) => p.data?.skills,
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
          console.log({ noteA, noteB });
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
      // {
      //   headerName: 'Attestations',
      // },
      // {
      //   headerName: 'Hired',
      // },
      // {
      //   headerName: 'Interviewed',
      // },
      // {
      //   headerName: 'Fake',
      // },
      // {
      //   headerName: 'Actions',
      // },
    ],
    [],
  );

  const setNotePayload = useSetAtom(noteUpdatePayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<DevTalent>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      if (data && newValue && oldValue !== newValue) {
        setNotePayload({ wallet: data.wallet, note: newValue });
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
