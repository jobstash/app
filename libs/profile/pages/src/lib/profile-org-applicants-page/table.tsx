/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { ApplicantTabs } from './applicant-tabs';
import { MultiSelectActions } from './multi-select-actions';
import { JobSelection } from './table-job-selection';
import { TablePagination } from './table-pagination';
import { TableSearchInput } from './table-search-input';
import { useApplicantsTable } from './use-applicants-table';

export const ApplicantsTable = () => {
  const {
    isLoading,
    items,
    columns,
    centeredSet,
    renderCell,
    searchFilter,
    setSearchFilter,
    onSearchChange,
    page,
    setPage,
    pageRowCount,
    totalPageCount,
    totalApplicantCount,
    jobs,
    jobSelection,
    onJobSelectionChange,
    onJobSelectionInputChange,
    selectedApplicants,
    onTableSelectionChange,
  } = useApplicantsTable();

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-4">
      <ApplicantTabs />

      <div className="flex items-center gap-8">
        <TableSearchInput
          value={searchFilter}
          setValue={setSearchFilter}
          onChange={onSearchChange}
        />

        <JobSelection
          isLoading={isLoading}
          items={jobs}
          inputValue={jobSelection.input}
          selectedKey={jobSelection.selectedKey}
          onInputChange={onJobSelectionInputChange}
          onSelectionChange={onJobSelectionChange}
        />
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <MultiSelectActions applicants={selectedApplicants} />

        <Table
          color="default"
          aria-label="Job Applicants Table"
          selectionMode="multiple"
          selectedKeys={selectedApplicants as Set<string>}
          onSelectionChange={onTableSelectionChange}
        >
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
              <TableRow key={item.user.wallet}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as any)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={page}
          total={totalPageCount}
          isDisabled={items.length < pageRowCount}
          totalApplicantCount={totalApplicantCount}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
