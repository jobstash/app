import { useEffect, useState } from 'react';

import { PlusIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/react';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';
import { useAtom } from 'jotai';

import { editAliasAtom } from '@jobstash/admin/state';
import { useOrgDetails } from '@jobstash/organizations/state';

interface Props {
  orgId: string;
}

export const OrgAlias = ({ orgId }: Props) => {
  const { isLoading, data } = useOrgDetails(orgId);

  const [alias, setAlias] = useState<string[]>([]);

  // Sync alias data
  useEffect(() => {
    if (data?.alias && alias.length === 0) {
      setAlias([data.alias]);
    }
  }, [alias.length, data?.alias]);

  const hasAlias = alias.length > 0;

  const [isHovering, setIsHovering] = useState(false);

  const [{ isOpen: isOpenEdit }, setEditAlias] = useAtom(editAliasAtom);

  const openEditModal = () => {
    if (data) {
      setEditAlias({
        org: data,
        alias,
        isOpen: true,
        originalAlias: data.alias ? [data.alias] : [],
      });
    }
  };

  if (isLoading) return <Spinner color="white" size="sm" />;

  return (
    <div
      className="flex gap-2 items-center min-h-[48px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {hasAlias ? (
        <div className="flex gap-2 items-center">
          {alias.map((a) => (
            <Chip key={a} size="sm">
              {a}
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

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 fill-white/60"
  >
    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
  </svg>
);
