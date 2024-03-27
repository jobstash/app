import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

import { cn } from '@jobstash/shared/utils';

import { TablePagination, TableSearchInput } from '@jobstash/profile/ui';
import { Loader, Text } from '@jobstash/shared/ui';

import { MultiSelectActions } from './multi-select-actions';
import { TalentTabs } from './tabs';
import { useTalentsTable } from './use-talents-table';
export const DevTalentsTable = () => {
  const {
    profileInfoData,
    isLoading,
    totalApplicantCount,
    items,
    searchFilter,
    setSearchFilter,
    onSearchChange,
    page,
    setPage,
    totalPageCount,
    columns,
    centeredSet,
    renderCell,
    selectedTalents,
    onTableSelectionChange,
    activeList,
  } = useTalentsTable();

  if (!profileInfoData) return null;

  // TODO: talent-list mutation
  const isPending = false;

  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col gap-6 px-4">
      <TalentTabs />

      {isLoading ? (
        <div className="pt-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <TableSearchInput
            isLoading={isLoading}
            value={searchFilter}
            setValue={setSearchFilter}
            isDisabled={!hasItems}
            onChange={onSearchChange}
          />

          <MultiSelectActions
            activeList={activeList}
            isPending={isPending}
            selectedTalents={selectedTalents}
          />

          <div className="flex flex-col gap-2 overflow-hidden">
            <Table
              color="default"
              aria-label="Job Applicants Table"
              selectionMode="multiple"
              classNames={{
                base: cn({
                  'opacity-60 pointer-events-none': isPending,
                }),
              }}
              selectedKeys={selectedTalents as Set<string>}
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
                    key={item.wallet}
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

            {hasItems && (
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
