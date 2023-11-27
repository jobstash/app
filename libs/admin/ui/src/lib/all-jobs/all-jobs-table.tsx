import { useEffect, useState, useTransition } from 'react';

import { List, Table } from '@mantine/core';
import {
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { JobsUpdateableFields } from '@jobstash/admin/core';
import { cn } from '@jobstash/shared/utils';

import {
  Button,
  Heading,
  SaveIcon,
  Text,
  ThrashIcon,
} from '@jobstash/shared/ui';

import EditableText from './editable-text';
import EditableTextarea from './editable-textarea';
import TableHeaderWrapper from './table-header-wrapper';

interface Props {
  allJobs: JobsUpdateableFields[];
}

const columnHelper = createColumnHelper<JobsUpdateableFields>();

const columns = [
  columnHelper.accessor('shortUUID', {
    cell: (info) => <Text>{info.getValue()}</Text>,
    header: () => <Heading size="label">ID</Heading>,
    size: 120,
  }),
  columnHelper.accessor('title', {
    cell: ({ getValue, row, column }) => (
      <EditableText
        getValue={getValue}
        rowIndex={row.index}
        columnId={column.id}
      />
    ),
    header: () => <Heading size="label">Title</Heading>,
    size: 320,
  }),
  columnHelper.accessor('url', {
    cell: ({ getValue, row, column }) => (
      <EditableText
        getValue={getValue}
        rowIndex={row.index}
        columnId={column.id}
      />
    ),
    header: () => <Heading size="label">URL</Heading>,
  }),
  columnHelper.accessor('summary', {
    cell: ({ getValue, row, column }) => (
      <EditableTextarea
        getValue={getValue}
        rowIndex={row.index}
        columnId={column.id}
      />
    ),
    header: () => <Heading size="label">Summary</Heading>,
  }),
  columnHelper.accessor('description', {
    cell: ({ getValue, row, column }) => (
      <EditableTextarea
        getValue={getValue}
        rowIndex={row.index}
        columnId={column.id}
      />
    ),
    header: () => <Heading size="label">Description</Heading>,
  }),
  columnHelper.accessor('benefits', {
    cell: (info) => (
      <div className="pr-6">
        <List listStyleType="disc" size="sm" spacing="xs">
          {info.getValue().map((value) => (
            <List.Item key={value}>{value}</List.Item>
          ))}
        </List>
      </div>
    ),
    header: () => <Heading size="label">Benefits</Heading>,
  }),
  columnHelper.accessor('requirements', {
    cell: (info) => (
      <div className="pr-6">
        <List listStyleType="disc" size="sm" spacing="xs">
          {info.getValue().map((value) => (
            <List.Item key={value}>{value}</List.Item>
          ))}
        </List>
      </div>
    ),
    header: () => <Heading size="label">Requirements</Heading>,
  }),
  columnHelper.accessor('responsibilities', {
    cell: (info) => (
      <div className="pr-6">
        <List listStyleType="disc" size="sm" spacing="xs">
          {info.getValue().map((value) => (
            <List.Item key={value}>{value}</List.Item>
          ))}
        </List>
      </div>
    ),
    header: () => <Heading size="label">Responsibilities</Heading>,
  }),
  columnHelper.accessor('location', {
    cell: ({ getValue, row, column }) => (
      <EditableText
        getValue={getValue}
        rowIndex={row.index}
        columnId={column.id}
      />
    ),
    header: () => <Heading size="label">Location</Heading>,
  }),
  columnHelper.accessor('locationType', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Location Type</Heading>,
    size: 160,
  }),
  columnHelper.accessor('classification', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Classification</Heading>,
    size: 160,
  }),
  columnHelper.accessor('seniority', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Seniority</Heading>,
    size: 80,
  }),
  columnHelper.accessor('commitment', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Commitment</Heading>,
    size: 160,
  }),
  columnHelper.accessor('paysInCrypto', {
    cell: (info) => (info.getValue() ?? false).toString(),
    header: () => <Heading size="label">Pays In Crypto</Heading>,
    size: 160,
  }),
  columnHelper.accessor('offersTokenAllocation', {
    cell: (info) => (info.getValue() ?? false).toString(),
    header: () => <Heading size="label">Offers Token Allocation</Heading>,
    size: 160,
  }),
  columnHelper.accessor('salary', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('minimumSalary', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Minimum Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('maximumSalary', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Maximum Salary</Heading>,
    size: 160,
  }),
  columnHelper.accessor('culture', {
    cell: (info) => info.getValue(),
    header: () => <Heading size="label">Culture</Heading>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <div className="flex items-center gap-4">
        <Button isIcon isDisabled>
          <SaveIcon />
        </Button>
        <Button isIcon isDisabled>
          <ThrashIcon />
        </Button>
      </div>
    ),
    header: () => <p>Actions</p>,
    size: 120,
  }),
];

const initColumns = new Set(['shortUUID', 'title', 'summary', 'actions']);

const AllJobsTable = ({ allJobs }: Props) => {
  const [data, setData] = useState(allJobs);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [sorting, setSorting] = useState<SortingState>([]);

  const [isPending, startTransition] = useTransition();

  const table = useReactTable<JobsUpdateableFields>({
    data,
    columns,
    state: {
      columnVisibility,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: (updater) => startTransition(() => setSorting(updater)),
    columnResizeMode: 'onEnd',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      size: 420,
      sortingFn: 'alphanumericCaseSensitive',
    },
  });

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!isReady && table.getIsAllColumnsVisible()) {
      const initVisibility: Record<string, boolean> = {};

      for (const column of table.getAllLeafColumns()) {
        const key = column.id;
        initVisibility[key] = initColumns.has(key);
      }

      table.setColumnVisibility(initVisibility);
      setIsReady(true);
    }
  }, [isReady, table]);
  if (!isReady) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap max-w-4xl items-center gap-4">
        <label className="cursor-pointer">
          <input
            {...{
              type: 'checkbox',
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{' '}
          Toggle All
        </label>

        {table.getAllLeafColumns().map((column) => (
          <label key={column.id} className="cursor-pointer">
            <input
              {...{
                type: 'checkbox',
                checked: column.getIsVisible(),
                onChange: column.getToggleVisibilityHandler(),
              }}
            />{' '}
            {column.id}
          </label>
        ))}
      </div>

      <div
        className={cn('overflow-x-auto', {
          'opacity-50 select-none': isPending,
        })}
      >
        <Table
          withBorder
          highlightOnHover
          withColumnBorders
          style={{ width: table.getCenterTotalSize() }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      position: 'relative',
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <TableHeaderWrapper
                        isSorted={header.column.getIsSorted() || null}
                        isSortable={header.column.getCanSort()}
                        clearSorting={header.column.clearSorting}
                        toggleSorting={header.column.toggleSorting}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHeaderWrapper>
                    )}

                    <div
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                      style={{
                        transform: header.column.getIsResizing()
                          ? `translateX(${
                              table.getState().columnSizingInfo.deltaOffset
                            }px)`
                          : '',
                      }}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllJobsTable;
