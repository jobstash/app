import { useCallback, useMemo, useState } from 'react';

import { Input } from '@nextui-org/input';
import { Pagination } from '@nextui-org/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, SearchInputIcon, Text } from '@jobstash/shared/ui';

import { OrgAlias } from './org-alias';
import { OrgCommunities } from './org-communities';

interface Props {
  data: OrgItem[];
}

export const OrgListTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const totalPageCount = Math.ceil(data.length / ROWS_PER_PAGE);

  const [filterValue, setFilterValue] = useState('');
  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let filteredOrgs = [...data];

    if (hasSearchFilter) {
      filteredOrgs = filteredOrgs.filter((org) =>
        org.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    // Other filter logic here ...

    return filteredOrgs;
  }, [data, filterValue, hasSearchFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const renderCell = useCallback((org: OrgItem, columnKey: React.Key) => {
    switch (columnKey) {
      case 'orgId': {
        return (
          <div className="flex justify-center w-10">
            <Text>{org.orgId}</Text>
          </div>
        );
      }

      case 'name': {
        const { name, location, logoUrl, website } = org;
        return (
          <LogoTitle
            title={name}
            location={location}
            avatarProps={{ alt: name, src: getLogoUrl(website[0], logoUrl) }}
          />
        );
      }

      case 'alias': {
        return <OrgAlias orgId={org.orgId} />;
      }

      case 'communities': {
        return <OrgCommunities org={org} />;
      }

      default: {
        return <p>{JSON.stringify(org[columnKey as keyof OrgItem])}</p>;
      }
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = useMemo(
    () => (
      <div>
        <Input
          isClearable
          placeholder="Search Organization"
          size="sm"
          value={filterValue}
          classNames={{
            base: 'w-96',
            inputWrapper: ['bg-darker-gray'],
            input: 'pl-2',
          }}
          startContent={<SearchInputIcon />}
          onClear={() => setFilterValue('')}
          onValueChange={onSearchChange}
        />
      </div>
    ),
    [filterValue, onSearchChange],
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={items.length === 0}
          page={page}
          total={totalPageCount}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {`Total Orgs: ${data.length}`}
        </span>
      </div>
    ),
    [data.length, page, totalPageCount, items],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Organizations List"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            width={column.key === 'orgId' ? 40 : 300}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No orgs found" items={items}>
        {(item) => (
          <TableRow key={item.orgId}>
            {(columnKey) => (
              <TableCell className="py-4">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const headerColumns = [
  { key: 'orgId', label: 'ORG ID' },
  { key: 'name', label: 'Organization' },
  { key: 'alias', label: 'Alias' },
  { key: 'communities', label: 'Communities' },
];

const ROWS_PER_PAGE = 8;
