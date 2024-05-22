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

import { useOrgProfileInfoContext } from '@jobstash/profile/state';

import { TablePagination, TableSearchInput } from '@jobstash/profile/ui';
import { Loader, Text } from '@jobstash/shared/ui';

import { ApplicantTabs } from './applicant-tabs';
import { MultiSelectActions } from './multi-select-actions';
import { JobSelection } from './table-job-selection';
import { useApplicantsTable } from './use-applicants-table';

export const ApplicantsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();
  const {
    isLoading,
    items,
    filteredItems,
    columns,
    centeredSet,
    renderCell,
    searchFilter,
    setSearchFilter,
    onSearchChange,
    page,
    setPage,
    totalPageCount,
    totalApplicantCount,
    jobs,
    jobSelection,
    onJobSelectionChange,
    onJobSelectionInputChange,
    selectedApplicants,
    onTableSelectionChange,
    activeList,
    setActiveList,
    isPending,
    mutate,
  } = useApplicantsTable();

  if (!profileInfoData) return null;

  const isEmpty = items.length === 0;

  return (
    <div className="flex flex-col gap-6 px-4">
      <ApplicantTabs activeList={activeList} setActiveList={setActiveList} />

      {isLoading ? (
        <div className="py-40 flex items-center justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-8">
            <TableSearchInput
              isLoading={isLoading}
              value={searchFilter}
              setValue={setSearchFilter}
              isDisabled={isEmpty}
              onChange={onSearchChange}
            />

            <JobSelection
              isLoading={isLoading}
              items={jobs}
              inputValue={jobSelection.input}
              selectedKey={jobSelection.selectedKey}
              isDisabled={isEmpty}
              onInputChange={onJobSelectionInputChange}
              onSelectionChange={onJobSelectionChange}
            />
          </div>

          <MultiSelectActions
            activeList={activeList}
            isPending={isPending}
            mutate={mutate}
            selectedApplicants={selectedApplicants}
            filteredItems={filteredItems}
          />

          <div className="flex flex-col gap-2 overflow-hidden">
            <Table
              color="default"
              aria-label="Job Applicants Table"
              selectionMode="multiple"
              selectedKeys={selectedApplicants as Set<string>}
              classNames={{
                base: cn({
                  'opacity-60 pointer-events-none': isPending,
                }),
              }}
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
              <TableBody items={items} emptyContent="No applicants to display.">
                {items.map((item, i) => (
                  <TableRow
                    key={item.user.wallet}
                    className={cn({ 'bg-[#212123]': i % 2 !== 0 })}
                  >
                    {(columnKey) => (
                      <TableCell className="py-4">
                        {renderCell(item, columnKey as any)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {!isEmpty && (
              <TablePagination
                page={page}
                total={totalPageCount}
                totalApplicantCount={totalApplicantCount}
                onChange={setPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
