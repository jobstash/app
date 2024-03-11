import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import { useApplicantsTable } from './use-applicants-table';

export const ApplicantsTable = () => {
  const { isLoading, applicants, columns, centeredSet, renderCell } =
    useApplicantsTable();

  const items = applicants.map((a, i) => ({ ...a, key: i }));

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-12">
      <Table aria-label="Job Applicants Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>
              <div
                className={cn('flex items-center', {
                  'justify-center': centeredSet.has(column.key),
                })}
              >
                <Text size="md" fw="bold">
                  {column.label}
                </Text>
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item,
                    columnKey as keyof Omit<typeof item, 'key'>,
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
