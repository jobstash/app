import { useCallback } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useAtomValue } from 'jotai';

import { AffiliationRequestItem } from '@jobstash/shared/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { useAdminAffiliationRequests } from '@jobstash/admin/state';

import { EmptyCellPlaceholder, Text } from '@jobstash/shared/ui';

import { ActionsCell } from './actions-cell';
import { activeTabAtom } from './atoms';
import { OrgCell } from './org-cell';
import { StatusCell } from './status-cell';
import { WalletItem } from './wallet-item';

export const OrgApprovalTable = () => {
  const activeTab = useAtomValue(activeTabAtom);

  const { data, isLoading, error } = useAdminAffiliationRequests(activeTab);

  const renderCell = useCallback(
    (
      { wallet, orgId, timestamp, status }: AffiliationRequestItem,
      columnkey: React.Key,
    ) => {
      switch (columnkey) {
        case 'orgId': {
          return <span>{orgId}</span>;
        }

        case 'org': {
          return <OrgCell orgId={orgId} />;
        }

        case 'wallet': {
          return <WalletItem wallet={wallet} />;
        }

        case 'timestamp': {
          if (!timestamp) return <EmptyCellPlaceholder />;
          return <span>{prettyTimestamp(timestamp)}</span>;
        }

        case 'status': {
          if (!status) return <EmptyCellPlaceholder />;
          return <StatusCell status={status} />;
        }

        case 'actions': {
          if (status !== 'pending') return null;
          return <ActionsCell wallet={wallet} orgId={orgId} />;
        }

        default: {
          return null;
        }
      }
    },
    [],
  );

  if (isLoading) return <LoadingPage />;
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <pre>{JSON.stringify(error, undefined, '\t')}</pre>
      </div>
    );
  }

  return (
    <Table removeWrapper radius="md">
      <TableHeader columns={COLUMNS}>
        {({ key, label, width }) => (
          <TableColumn key={key} width={width}>
            <div>
              <Text fw="bold">{label}</Text>
            </div>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No items found" items={data}>
        {(item) => (
          <TableRow key={item.wallet} className="data-[odd=true]:bg-[#1a191e]">
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

const COLUMNS = [
  { key: 'orgId', label: 'Org ID', width: 80 },
  { key: 'org', label: 'Organization', width: 420 },
  { key: 'wallet', label: 'Wallet' },
  { key: 'status', label: 'Status' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'actions', label: 'Actions', width: 80 },
];
