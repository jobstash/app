import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Spinner } from '@heroui/spinner';
import { Tooltip } from '@heroui/tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { Check, EllipsisVertical, RefreshCcw } from 'lucide-react';

import { ImportItem as IOrgImportItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import {
  orgImportItemsAtom,
  orgImportTabAtom,
  useOrgImport,
  usePollOrgIdByUrl,
} from '@jobstash/admin/state';
import { useMwVersionContext } from '@jobstash/shared/state';

import { LogoTitle } from '@jobstash/shared/ui';

const POLL_TIMEOUT = 300_000; // 5 mins

const ItemMenu = ({
  id,
  assignedId,
}: {
  id: string;
  assignedId?: string | null;
}) => {
  const { push } = useRouter();

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  const onDelete = () => {
    const updatedItems = orgImportItems.filter(
      (orgImportItem) => id !== orgImportItem.id,
    );
    setOrgImportItems(updatedItems);
  };

  const openManagePage = () => {
    if (assignedId) {
      push(`/godmode/organizations/manage/${assignedId}`);
    }
  };

  const menuItems = [
    ...(assignedId
      ? [{ label: 'Manage organization', onClick: openManagePage }]
      : []),
    { label: 'Remove from tracklist', onClick: onDelete },
  ];

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <EllipsisVertical className="h-5 w-5 -mt-0.5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {menuItems.map((item) => (
          <DropdownItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

interface Props {
  item: IOrgImportItem;
}

const OrgImportItem = ({ item }: Props) => {
  const isPending = item.status === 'pending';
  const isDone = item.status === 'done';

  const [orgImportItems, setOrgImportItems] = useAtom(orgImportItemsAtom);

  const updateItemStatus = useCallback(
    (status: IOrgImportItem['status']) => {
      const updatedItems = orgImportItems.map((orgImportItem) =>
        item.id === orgImportItem.id ? { ...item, status } : orgImportItem,
      );

      setOrgImportItems(updatedItems);
    },
    [item, orgImportItems, setOrgImportItems],
  );

  const { mutate: importOrg, isPending: isImporting } = useOrgImport(false);
  const onRetry = () => {
    updateItemStatus('pending');
    importOrg(
      { name: item.name, url: item.url },
      {
        onError() {
          updateItemStatus('stale');
        },
      },
    );
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPending) {
      timeout = setTimeout(() => {
        updateItemStatus('stale');
      }, POLL_TIMEOUT);
    }

    return () => clearTimeout(timeout);
  }, [isPending, updateItemStatus]);

  const { data: orgId } = usePollOrgIdByUrl(item.url, isPending);

  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  useEffect(() => {
    if (isPending && typeof orgId === 'string') {
      updateItemStatus('done');
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
      });
    }
  }, [isPending, mwVersion, orgId, queryClient, updateItemStatus]);

  return (
    <div className="p-4 border border-zinc-800 rounded-xl flex flex-col gap-2 min-w-xs">
      <div className="flex items-center gap-8">
        <LogoTitle
          size="sm"
          title={item.name}
          location={
            <span className="text-sm text-white/60 block max-w-full break-all">
              {item.url}
            </span>
          }
          avatarProps={{ alt: item.name, src: getLogoUrl(item.url) }}
        />
        <div className="flex items-center gap-2">
          {isPending ? (
            <Spinner color="white" size="sm" />
          ) : isDone ? (
            <Tooltip content="Done">
              <Check className="h-6 w-6 -mt-0.5 font-bold text-green-500 stroke-2" />
            </Tooltip>
          ) : (
            <Tooltip content="Retry Import">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                isDisabled={isImporting}
                onPress={onRetry}
              >
                {isImporting ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <RefreshCcw className="h-4 w-4 -mt-0.5" />
                )}
              </Button>
            </Tooltip>
          )}
          <ItemMenu id={item.id} assignedId={orgId} />
        </div>
      </div>
    </div>
  );
};

export const OrgImportItems = () => {
  const orgImportItems = useAtomValue(orgImportItemsAtom);
  const orgImportTab = useAtomValue(orgImportTabAtom);

  const items = useMemo(
    () =>
      orgImportItems
        .filter(
          (item) => orgImportTab === 'all' || item.status === orgImportTab,
        )
        .sort((a, b) => b.ts - a.ts),
    [orgImportItems, orgImportTab],
  );

  const [animateRef] = useAutoAnimate();

  return (
    <div ref={animateRef} className="flex flex-wrap gap-8">
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <OrgImportItem key={`${item.id}-${item.status}`} item={item} />
          ))}
        </>
      ) : (
        <div className="p-4 w-full">
          <span className="text-white/80">No items to display</span>
        </div>
      )}
    </div>
  );
};
