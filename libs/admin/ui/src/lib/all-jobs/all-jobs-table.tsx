import { useEffect, useState } from 'react';

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

interface Props {
  allJobs: JobsUpdateableFields[];
}

const columnHelper = createColumnHelper<JobsUpdateableFields>();

const columns = [
  columnHelper.accessor('shortUUID', {
    cell: (info) => info.getValue(),
    header: () => <p>ID</p>,
    size: 80,
  }),
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: () => <p>Title</p>,
    size: 320,
  }),
  columnHelper.accessor('url', {
    cell: (info) => info.getValue(),
    header: () => <p>URL</p>,
  }),
  columnHelper.accessor('summary', {
    cell: (info) => info.getValue(),
    header: () => <p>Summary</p>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => info.getValue(),
    header: () => <p>Description</p>,
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
    header: () => <p>Benefits</p>,
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
    header: () => <p>Requirements</p>,
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
    header: () => <p>Responsibilities</p>,
  }),
  columnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: () => <p>Location</p>,
  }),
  columnHelper.accessor('locationType', {
    cell: (info) => info.getValue(),
    header: () => <p>Location Type</p>,
    size: 120,
  }),
  columnHelper.accessor('classification', {
    cell: (info) => info.getValue(),
    header: () => <p>Classification</p>,
    size: 160,
  }),
  columnHelper.accessor('seniority', {
    cell: (info) => info.getValue(),
    header: () => <p>Seniority</p>,
    size: 80,
  }),
  columnHelper.accessor('commitment', {
    cell: (info) => info.getValue(),
    header: () => <p>Commitment</p>,
    size: 120,
  }),
  columnHelper.accessor('paysInCrypto', {
    cell: (info) => (info.getValue() ?? false).toString(),
    header: () => <p>Pays In Crypto</p>,
    size: 120,
  }),
  columnHelper.accessor('offersTokenAllocation', {
    cell: (info) => (info.getValue() ?? false).toString(),
    header: () => <p>Offers Token Allocation</p>,
    size: 120,
  }),
  columnHelper.accessor('salary', {
    cell: (info) => info.getValue(),
    header: () => <p>Salary</p>,
    size: 120,
  }),
  columnHelper.accessor('minimumSalary', {
    cell: (info) => info.getValue(),
    header: () => <p>Minimum Salary</p>,
    size: 120,
  }),
  columnHelper.accessor('maximumSalary', {
    cell: (info) => info.getValue(),
    header: () => <p>Maximum Salary</p>,
    size: 120,
  }),
  columnHelper.accessor('culture', {
    cell: (info) => info.getValue(),
    header: () => <p>Culture</p>,
  }),
];

const initColumns = new Set([
  'shortUUID',
  'title',
  'summary',
  'locationType',
  'commitment',
]);

const AllJobsTable = ({ allJobs }: Props) => {
  const [data, setData] = useState(allJobs);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<JobsUpdateableFields>({
    data,
    columns,
    state: {
      columnVisibility,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
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
        <label>
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
          <label key={column.id}>
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

      <div className="overflow-x-auto">
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
                      <div
                        className={cn(
                          'flex items-center gap-2 py-2 font-bold text-white text-md',
                          {
                            'cursor-pointer select-none':
                              header.column.getCanSort(),
                            'justify-center':
                              header.column.getSize() < 300
                                ? 'center'
                                : undefined,
                          },
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
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
                      textAlign:
                        cell.column.getSize() < 300 ? 'center' : undefined,
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
