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

import { OrgListItem } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import { OrgAlias } from './org-alias';
import { OrgCommunities } from './org-communities';
import { SearchInputIcon } from './search-input-icon';

interface Props {
  data: OrgListItem[];
}

export const OrgListTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(data.length / ROWS_PER_PAGE);

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

  const renderCell = useCallback((org: OrgListItem, columnKey: React.Key) => {
    const cellValue = org[columnKey as keyof OrgListItem];

    switch (columnKey) {
      case 'orgId': {
        return (
          <div className="flex justify-center w-10">
            <Text>{cellValue}</Text>
          </div>
        );
      }

      case 'name': {
        const { name, location, logoUrl, url } = org;
        return (
          <LogoTitle
            title={name}
            location={location}
            avatarProps={{ alt: name, src: getLogoUrl(url, logoUrl) }}
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
        return <p>{JSON.stringify(cellValue)}</p>;
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
          isDisabled={filteredItems.length < ROWS_PER_PAGE}
          page={page}
          total={filteredItems.length}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {`Total Orgs: ${data.length}`}
        </span>
      </div>
    ),
    [data.length, filteredItems.length, page],
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
