import { useMemo, useState } from 'react';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/react';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { useAtom } from 'jotai';

import { editAliasAtom } from '@jobstash/admin/state';
import { useOrgDetails } from '@jobstash/organizations/state';

import { EditIcon } from './edit-icon';

interface Props {
  orgId: string;
}

export const OrgAlias = ({ orgId }: Props) => {
  const { isLoading, isRefetching, data } = useOrgDetails(orgId);

  const aliases = useMemo(() => data?.aliases ?? [], [data]);

  const hasAlias = aliases.length > 0;

  const [isHovering, setIsHovering] = useState(false);

  const [{ isOpen: isOpenEdit }, setEditAlias] = useAtom(editAliasAtom);

  const openEditModal = () => {
    if (data) {
      setEditAlias({
        org: data,
        aliases,
        isOpen: true,
        originalAlias: data?.aliases ?? [],
      });
    }
  };

  if (isLoading || isRefetching) return <Spinner color="white" size="sm" />;

  return (
    <div
      className="flex gap-2 items-center min-h-[48px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {hasAlias ? (
        <div className="flex gap-2 items-center">
          {aliases.map((alias) => (
            <Chip key={alias} size="sm">
              {alias}
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
