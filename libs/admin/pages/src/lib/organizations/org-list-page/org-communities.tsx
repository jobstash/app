import { useState } from 'react';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { useAtom } from 'jotai';

import { OrgListItem } from '@jobstash/organizations/core';

import { editCommunitiesAtom, useAllOrgs } from '@jobstash/admin/state';

import { EditIcon } from './edit-icon';

interface Props {
  org: OrgListItem;
}

export const OrgCommunities = ({ org }: Props) => {
  const { isRefetching } = useAllOrgs();
  const hasCommunities = org.community.length > 0;

  const [isHovering, setIsHovering] = useState(false);

  const [
    {
      isOpen: isOpenEdit,
      org: { orgId: lastEditId },
    },
    setAtomValue,
  ] = useAtom(editCommunitiesAtom);

  const openEditModal = () => {
    setAtomValue({
      org,
      communities: org.community,
      isOpen: true,
    });
  };

  if (isRefetching && lastEditId === org.orgId)
    return <Spinner color="white" size="sm" />;

  return (
    <div
      className="flex gap-2 items-center min-h-[48px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {hasCommunities ? (
        <div className="flex gap-2 items-center">
          {org.community.map((community) => (
            <Chip key={community} size="sm">
              {community}
            </Chip>
          ))}
        </div>
      ) : (
        <p className="pl-2">None</p>
      )}

      {isHovering && !isOpenEdit && (
        <Tooltip content="Add Alias">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            onClick={openEditModal}
          >
            <EditIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
