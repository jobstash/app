import { useCallback } from 'react';

import { EnvelopeIcon } from '@heroicons/react/16/solid';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { OrgProfileInfo } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import {
  CalendarIcon,
  GithubLogoIcon,
  LinkedInIcon,
  Text,
} from '@jobstash/shared/ui';

import { ActionButtons } from './action-buttons';
import { PreferredContactItem } from './preferred-contact-item';
import { SubscriberItem } from './subscriber-item';
import { UserInfoItem } from './user-info-item';
import { WalletItem } from './wallet-item';

interface Props {
  data: OrgProfileInfo[];
  showActions?: boolean;
}

export const ApprovalTable = ({ data, showActions }: Props) => {
  const renderCell = useCallback(
    (org: OrgProfileInfo, columnKey: React.Key) => {
      switch (columnKey) {
        case 'orgId': {
          const { orgId } = org;
          return (
            <div className="flex justify-center w-10">
              <Text>{JSON.stringify(orgId)}</Text>
            </div>
          );
        }

        case 'wallet': {
          const { wallet, avatar } = org;
          return <WalletItem wallet={wallet} avatar={avatar} />;
        }

        case 'user': {
          const { username, email, linkedin, calendly } = org;
          return (
            <div className="flex flex-col gap-2">
              <UserInfoItem
                icon={<GithubLogoIcon />}
                text={username}
                tooltip="Github"
              />
              <UserInfoItem
                icon={<EnvelopeIcon className="w-3 h-3" />}
                text={email}
                tooltip="Email"
              />
              <UserInfoItem
                icon={<LinkedInIcon />}
                text={linkedin}
                tooltip="LinkedIn"
              />
              <UserInfoItem
                icon={<CalendarIcon />}
                text={calendly}
                tooltip="Calendly"
              />
            </div>
          );
        }

        case 'contact': {
          const { contact } = org;
          return <PreferredContactItem contact={contact} />;
        }

        case 'subscriber': {
          const { subscriberStatus } = org;
          return <SubscriberItem subscriberStatus={subscriberStatus} />;
        }

        case 'reference': {
          const {
            internalReference: {
              referenceContact: contact,
              referenceContactPlatform: contactPlatform,
              referencePersonName: name,
              referencePersonRole: role,
            },
          } = org;
          return (
            <div className="flex flex-col gap-2">
              {name && <Text>Name: {name}</Text>}
              {role && <Text>Role: {role}</Text>}
              {contactPlatform && (
                <Text>Contact Platform: {contactPlatform}</Text>
              )}
              {contact && <Text>Contact Handle: {contact}</Text>}
              {!name && !role && !contactPlatform && !contact && 'N/A'}
            </div>
          );
        }

        case 'actions': {
          return <ActionButtons org={org} />;
        }

        default: {
          return null;
        }
      }
    },
    [],
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Organizations List"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
    >
      <TableHeader columns={getHeaderColumns(showActions)}>
        {(column) => (
          <TableColumn
            key={column.key}
            width={column.key === 'orgId' ? 40 : 300}
          >
            <div
              className={cn('flex items-center', {
                'justify-center': centeredKeys.has(column.key),
              })}
            >
              <Text fw="bold">{column.label}</Text>
            </div>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="No orgs found" items={data}>
        {(item) => (
          <TableRow key={item.wallet}>
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

const DEFAULT_COLUMNS = [
  { key: 'orgId', label: 'ORG ID' },
  { key: 'wallet', label: 'Wallet' },
  { key: 'user', label: 'User' },
  { key: 'contact', label: 'Preferred Contact' },
  { key: 'subscriber', label: 'Subscribed' },
  { key: 'reference', label: 'Reference' },
];

const getHeaderColumns = (showActions?: boolean) => {
  const headerColumns = [...DEFAULT_COLUMNS];

  if (showActions) {
    headerColumns.push({ key: 'actions', label: 'Actions' });
  }

  return headerColumns;
};

const centeredKeys = new Set(['orgId', 'actions']);
