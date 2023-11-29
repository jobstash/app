import { useEffect, useState, useTransition } from 'react';

import { Table } from '@mantine/core';
import {
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { type RowData } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { cn } from '@jobstash/shared/utils';

import ColumnToggler from './column-toggler';
import { columns } from './columns';
import TableHeaderWrapper from './table-header-wrapper';

interface Props {
  allJobs: JobsUpdateableFields[];
}

const initColumns = new Set(['shortUUID', 'title', 'actions']);

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
    meta: {
      allJobs,
      updateData(rowIndex, columnId, value) {
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row,
          ),
        );
      },
      resetRow(rowIndex, value) {
        setData((prev) =>
          prev.map((row, index) => (index === rowIndex ? value : row)),
        );
      },
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

  if (!isReady || data.length === 0) return <p>Loading Table ...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap max-w-4xl items-center gap-4">
        <ColumnToggler
          label="Toggle All"
          isChecked={table.getIsAllColumnsVisible()}
          handler={table.getToggleAllColumnsVisibilityHandler()}
        />

        {table.getAllLeafColumns().map((column) => (
          <ColumnToggler
            key={column.id}
            label={column.id}
            isChecked={column.getIsVisible()}
            handler={column.getToggleVisibilityHandler()}
          />
        ))}
      </div>

      <div
        className={cn('overflow-x-auto', {
          'opacity-30 select-none': isPending,
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

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    allJobs: JobsUpdateableFields[];
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    resetRow: (rowIndex: number, value: JobsUpdateableFields) => void;
  }
}
