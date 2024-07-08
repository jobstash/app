import { useCallback, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';

import { DevTalent } from '@jobstash/profile/core';
import { convertFalseStringValuesToNull } from '@jobstash/shared/utils';

import {
  BooleanCell,
  EcosystemActivationsCell,
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
            <UserCell user={{ wallet, avatar, username, email, location }} />
          );
        },
        valueGetter: (p) => p.data?.username || p.data?.email,
        width: 280,
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
      },
      {
        headerName: 'Showcase',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <ShowcaseCell showcases={props.data?.showcases} />
        ),
      },
      {
        headerName: 'Skills',
        width: 320,
        cellRenderer: (props: CellProps) => (
          <SkillsCell isMatched={false} skills={props.data?.skills} />
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
        cellRenderer: (props: CellProps) => (
          <BooleanCell value={Boolean(props.data?.cryptoAjacent)} />
        ),
      },
      {
        headerName: 'Ecosystem Activations',
        cellRenderer: (props: CellProps) => (
          <EcosystemActivationsCell wallet={props.data?.wallet} />
        ),
      },
      // {
      //   headerName: 'Notes',
      //   width: 320,
      //   valueGetter: (p) => p.data?.notes,
      //   valueSetter(p) {
      //     console.log('save', { xxx: p.data.notes, newValue: p.newValue });
      //     return true;
      //   },
      //   cellRenderer: (props: CellProps) => (
      //     <NotesCell notes={props.data?.notes} />
      //   ),
      //   cellStyle: { whiteSpace: 'normal', lineHeight: '1.2' },
      //   editable: true,
      //   cellEditor: 'agLargeTextCellEditor',
      //   cellEditorPopup: true,
      //   cellEditorParams: {
      //     maxLength: 1000,
      //     rows: 15,
      //     cols: 50,
      //   },
      // },
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

  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<DevTalent>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      if (data && oldValue !== newValue) {
        console.log({ newValue }, 'TODO');
      }

      console.log({ oldValue, newValue });
    },
    [],
  );

  return {
    gridRef,
    getRowId,
    columnDefs,
    onCellEditingStopped,
  };
};
