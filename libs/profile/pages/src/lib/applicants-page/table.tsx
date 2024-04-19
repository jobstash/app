import { useCallback, useState } from 'react';

import {
  BaseGridCell,
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';

import { openNewTab } from '@jobstash/shared/utils';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useOrgProfileInfoContext } from '@jobstash/profile/state';

export const ApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();

  const { data, isPending } = useJobApplicants(profileInfoData?.orgId, 'all');

  const getContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const {
        user: { wallet, avatar, email, username, availableForWork, skills },
        job: { tags },
      } = (data ?? [])[row];

      switch (indexes[col]) {
        case 'avatar': {
          if (!avatar) return getDefaultGridCell({ contentAlign: 'center' });

          return {
            kind: GridCellKind.Image,
            allowOverlay: false,
            readonly: true,
            data: [avatar],
            rounding: 100,
            contentAlign: 'center',
          };
        }

        case 'wallet': {
          return {
            kind: GridCellKind.RowID,
            data: wallet,
            readonly: true,
            allowOverlay: false,
          };
        }

        case 'email': {
          if (!email) return getDefaultGridCell();

          const link = `mailto:${email}`;

          return {
            kind: GridCellKind.Uri,
            allowOverlay: false,
            displayData: email,
            data: link,
            hoverEffect: true,
            onClickUri(args) {
              args.preventDefault();
              openNewTab(link);
            },
          };
        }

        case 'github': {
          if (!username) return getDefaultGridCell();

          const link = `https://github.com/${username}`;

          return {
            kind: GridCellKind.Uri,
            allowOverlay: false,
            displayData: username,
            data: link,
            hoverEffect: true,
            onClickUri(args) {
              args.preventDefault();
              openNewTab(link);
            },
          };
        }

        case 'availableForWork': {
          if (availableForWork === null) return getDefaultGridCell();
          const text = availableForWork.toString();
          return {
            kind: GridCellKind.Text,
            allowOverlay: false,
            displayData: text,
            data: text,
            contentAlign: 'center',
          };
        }

        case 'skills': {
          const skillSet = new Set<string>();
          for (const skill of skills) {
            skillSet.add(skill.name);
          }

          const matchingSkills = [];
          for (const { name } of tags) {
            if (skillSet.has(name)) {
              matchingSkills.push(name);
            }
          }

          if (matchingSkills.length === 0)
            return getDefaultGridCell({ text: 'None' });

          return {
            kind: GridCellKind.Bubble,
            allowOverlay: false,
            data: matchingSkills,
          };
        }

        default: {
          throw new Error('Invalid applicant table prop');
        }
      }
    },
    [data],
  );

  const [columns, setColumns] = useState<GridColumn[]>(DEFAULT_COLUMNS);

  const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    setColumns((prev) => {
      const index = prev.findIndex(
        (prevColumn) => prevColumn.title === column.title,
      );
      const newColumns = [...prev];
      newColumns.splice(index, 1, { ...prev[index], width: newSize });
      return newColumns;
    });
  }, []);

  return (
    <div>
      <DataEditor
        getCellContent={getContent}
        columns={columns}
        rows={data?.length ?? 0}
        rowHeight={40}
        theme={{
          //
          bgCell: '#141317',
          textDark: 'white',
          bgHeader: '#141317',
          bgHeaderHasFocus: 'rgb(52, 52, 52)',
          bgHeaderHovered: 'rgb(75, 75, 75)',
          textHeader: 'white',
          accentColor: 'rgb(75,75,75)',
          linkColor: '#8fb2f7',
          accentLight: 'rgb(30, 30, 30)',
          bgBubble: 'rgb(52, 52, 52)',
          textBubble: 'white',
        }}
        onColumnResize={onColumnResize}
      />
      <pre>
        {JSON.stringify(
          { isPending: isPending.toString(), shape: (data ?? [])[0] },
          undefined,
          '\t',
        )}
      </pre>
    </div>
  );
};

const indexes = [
  'avatar',
  'wallet',
  'email',
  'github',
  'availableForWork',
  'skills',
  // 'city',
  // 'country',
  // 'showcases',
  // 'workHistory',
  // 'job',
  // 'attestations',
  // 'appliedTimestamp',
  // 'calendly',
  // 'oss',
  // 'interviewed',
  // 'cryptoNative',
  // 'upcomingTalent',
] as const;

const DEFAULT_COLUMNS: GridColumn[] = [
  {
    id: 'avatar',
    title: 'Avatar',
    width: 60,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    width: 340,
  },
  {
    id: 'email',
    title: 'Email',
    width: 180,
  },
  {
    id: 'github',
    title: 'Github',
  },
  {
    id: 'availableForWOrk',
    title: 'Available for Work',
  },
  {
    id: 'skills',
    title: 'Matching Skills',
  },
];

const getDefaultGridCell = (args?: {
  text?: string;
  contentAlign?: BaseGridCell['contentAlign'];
}): GridCell => {
  const { text = 'N/A', contentAlign } = args ?? {
    text: 'N/A',
  };

  return {
    kind: GridCellKind.Text,
    allowOverlay: false,
    displayData: text,
    data: text,
    contentAlign,
  };
};
