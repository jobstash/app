import { useCallback, useMemo, useRef } from 'react';

import { ColDef, GetRowIdFunc } from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';

import { DevTalent } from '@jobstash/profile/core';
import { convertFalseStringValuesToNull } from '@jobstash/shared/utils';

import {
  ShowcaseCell,
  SkillsCell,
  SocialsCell,
  UserCell,
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

  return {
    gridRef,
    getRowId,
    columnDefs,
  };
};
