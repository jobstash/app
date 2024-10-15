import { useEffect, useMemo, useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Tooltip,
} from '@nextui-org/react';
import { useAtom, useAtomValue } from 'jotai';
import { Check, EllipsisVertical, RefreshCcw } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { usePollOrgIdByUrl } from '@jobstash/admin/state';
import { getOrgIdByUrl } from '@jobstash/admin/data';

import { LogoTitle } from '@jobstash/shared/ui';

import { orgImportItemsAtom, orgImportTabAtom } from '../core/atoms';
import { OrgImportItem as IOrgImportItem, OrgImportItem } from '../core/types';
import { useOrgImport } from '../hooks/use-org-import';

const ItemMenu = ({ orgId }: { orgId?: string }) => {
  const menuItems = [
    ...(orgId ? [{ label: 'Manage organization' }] : []),
    { label: 'Remove from tracklist' },
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
          <DropdownItem key={item.label}>{item.label}</DropdownItem>
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

  const updateItemStatus = (status: OrgImportItem['status']) => {
    const updatedItems = orgImportItems.map((orgImportItem) =>
      item.id === orgImportItem.id ? { ...item, status } : orgImportItem,
    );

    setOrgImportItems(updatedItems);
  };

  const { mutate: importOrg, isPending: isImporting } = useOrgImport(false);
  const onRetry = () => {
    updateItemStatus('pending');
    importOrg(
      { name: item.name, url: item.url },
      {
        onSuccess() {
          updateItemStatus('done');
        },
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
      }, 120_000);
    }

    return () => clearTimeout(timeout);
  }, [isPending]);

  const { data: orgId } = usePollOrgIdByUrl(item.url, isPending);

  useEffect(() => {
    if (isPending && typeof orgId === 'string') {
      updateItemStatus('done');
    }
  }, [orgId, isPending]);

  const [orgIdDone, setOrgIdDone] = useState<string | null>(null);
  useEffect(() => {
    if (isDone && !orgIdDone) {
      const fetchId = async () => {
        const id = (await getOrgIdByUrl(item.url)) as string;
        setOrgIdDone(id);
      };

      fetchId();
    }
  }, [isDone, orgIdDone]);

  return (
    <div className="p-4 border border-zinc-800 rounded-xl flex flex-col gap-2 min-w-xs">
      <div className="flex items-center gap-8">
        <LogoTitle
          size="sm"
          title={item.name}
          location={item.url}
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
          <ItemMenu orgId={orgIdDone ?? orgId} />
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

  // TODO: show depending on what tab is selected
  // TODO: map each item to OrgImportItem

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
