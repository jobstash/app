import Link from 'next/link';

import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Unlink2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { useManagedOrg } from '../hooks/use-managed-org';

import { AddOrgSearchInput } from './add-org-search-input';

interface Props {
  orgId: string | null;
  isPending: boolean;
  onAddOrg: (id: string) => void;
  onUnlinkOrg: (id: string) => void;
}

export const ProjectOrgForm = ({
  orgId,
  isPending,
  onAddOrg,
  onUnlinkOrg,
}: Props) => {
  const { data } = useManagedOrg(orgId);

  if (!orgId) {
    return (
      <div className="flex flex-col gap-4">
        <Heading size="md">Link Organization</Heading>
        <AddOrgSearchInput
          clearSelectionOnSelect
          isPending={isPending}
          onAddOrg={onAddOrg}
        />
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex items-center gap-6">
        <LogoTitle
          size="md"
          title={
            <Link
              className="[&>*]:hover:underline"
              href={`/godmode/organizations/manage/${data.orgId}`}
            >
              <Heading size="sm">{data.name}</Heading>
            </Link>
          }
          location={data.location}
          avatarProps={{
            alt: data.name ?? '',
            src: getLogoUrl(
              data.websites.length > 0 ? data.websites[0] : '',
              data.logoUrl,
            ),
          }}
        />
        <Tooltip content={<span>Unlink Organization</span>}>
          <Button
            isIconOnly
            size="sm"
            isLoading={isPending}
            onClick={() => onUnlinkOrg(orgId)}
          >
            <Unlink2 className="h-4 w-4 text-red-500" />
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="w-28 h-10 flex items-center justify-center">
      <Spinner size="md" color="white" />
    </div>
  );
};
