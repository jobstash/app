import Head from 'next/head';
import { useCallback } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { ProfileInfo } from '@jobstash/profile/core';
import { capitalize, cn } from '@jobstash/shared/utils';

import { usePendingOrgsQuery } from '@jobstash/admin/state';

import { AdminLayout } from '@jobstash/admin/ui';
import { Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ActionButtons } from './action-buttons';

type ProfileInfoKey = keyof ProfileInfo;
type ColumnKey = ProfileInfoKey | 'status' | 'actions';

export const OrgApprovalPage = () => {
  const { isLoading, isFetching, data: pendingOrgs } = usePendingOrgsQuery();

  //
  // const data = fakeProfileInfos().map((d, i) => ({ ...d, key: i }));
  const data = (pendingOrgs ?? []).map((d, i) => ({ ...d, key: i }));

  const renderCell = useCallback((user: ProfileInfo, columnKey: ColumnKey) => {
    if (columnKey === 'contact') {
      const contact = user[columnKey];
      if (contact.preferred) {
        return <Text>{`${contact.preferred}: ${contact.value}`}</Text>;
      }
    }

    if (columnKey === 'location') {
      const { city, country } = user[columnKey];
      return <Text>{`${city}, ${country}`}</Text>;
    }

    if (columnKey === 'status') {
      return <Text>PENDING</Text>;
    }

    if (columnKey === 'actions') {
      return <ActionButtons />;
    }

    const text = user[columnKey as ProfileInfoKey] as string;
    return <Text>{`${text}`}</Text>;
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Godmode | All Jobs</title>
      </Head>

      <AdminLayout breadCrumbs={null} sidebar={<SideBar />} tabsSection={null}>
        <div className="w-full flex flex-col gap-4">
          <pre>{JSON.stringify({ data }, undefined, '\t')}</pre>
          <Table
            aria-label={TABLE_ARIA}
            classNames={{
              base: cn({ 'pointer-events-none opacity-60': isFetching }),
            }}
          >
            <TableHeader columns={COLUMNS}>
              {(column) => (
                <TableColumn key={column.key}>
                  <div
                    className={cn('flex items-center', {
                      'justify-center': column.key === 'actions',
                    })}
                  >
                    <Text size="md" fw="bold">
                      {column.label}
                    </Text>
                  </div>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as keyof ProfileInfo)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AdminLayout>
    </>
  );
};

/**
 * TODO:
 * - use next-ui table custom cells
 * = add profile-info fakers
 */

const TABLE_ARIA = 'Table of Pending Org Approvals';

const COLUMNS = [
  'username',
  'email',
  'contact',
  'location',
  'status',
  'actions',
].map((column) => ({
  key: column,
  label: capitalize(column),
}));
