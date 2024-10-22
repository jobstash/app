import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

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
import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { Check, EllipsisVertical, RefreshCcw } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { projectImportItemsAtom, projectImportTabAtom } from '../core/atoms';
import { ImportItem } from '../core/types';
import { usePollProjectIdyByUrl } from '../hooks/use-poll-project-id-by-url';
import { useProjectImport } from '../hooks/use-project-import';

const POLL_TIMEOUT = 300_000; // 5 mins

interface ItemMenuProps {
  id: string;
  assignedId?: string | null;
}

const ItemMenu = ({ id, assignedId }: ItemMenuProps) => {
  const { push } = useRouter();

  const [importItems, setImportItems] = useAtom(projectImportItemsAtom);

  const onDelete = () => {
    const updatedItems = importItems.filter(
      (importItem) => id !== importItem.id,
    );
    setImportItems(updatedItems);
  };

  const openManagePage = () => {
    if (assignedId) {
      push(`/godmode/projects/manage/${assignedId}`);
    }
  };

  const menuItems = [
    ...(assignedId
      ? [{ label: 'Manage project', onClick: openManagePage }]
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

interface ProjectImportItemProps {
  item: ImportItem;
}

const ProjectImportItem = ({ item }: ProjectImportItemProps) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const isPending = item.status === 'pending';
  const isDone = item.status === 'done';

  const [importItems, setImportItems] = useAtom(projectImportItemsAtom);

  const updateItemStatus = useCallback(
    (status: ImportItem['status']) => {
      const updatedItems = importItems.map((importItem) =>
        item.id === importItem.id ? { ...item, status } : importItem,
      );

      setImportItems(updatedItems);
    },
    [importItems, item, setImportItems],
  );

  const { mutate: importProject, isPending: isImporting } =
    useProjectImport(false);

  const onRetry = () => {
    updateItemStatus('pending');
    importProject(
      { name: item.name, url: item.url },
      {
        onError() {
          updateItemStatus('stale');
        },
      },
    );
  };

  // Terminate poll if it takes too long
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPending) {
      timeout = setTimeout(() => {
        updateItemStatus('stale');
      }, POLL_TIMEOUT);
    }

    return () => clearTimeout(timeout);
  }, [isPending, updateItemStatus]);

  const { data: projectId } = usePollProjectIdyByUrl(item.url, isPending);

  // Invalidate cache and update status if import is done
  useEffect(() => {
    if (isPending && typeof projectId === 'string') {
      updateItemStatus('done');
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });
    }
  }, [isPending, mwVersion, projectId, queryClient, updateItemStatus]);

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
          <ItemMenu id={item.id} assignedId={projectId} />
        </div>
      </div>
    </div>
  );
};

export const ProjectImportItems = () => {
  const importItems = useAtomValue(projectImportItemsAtom);
  const importTab = useAtomValue(projectImportTabAtom);

  const items = useMemo(
    () =>
      importItems
        .filter((item) => importTab === 'all' || item.status === importTab)
        .sort((a, b) => b.ts - a.ts),
    [importItems, importTab],
  );

  const [animateRef] = useAutoAnimate();

  return (
    <div ref={animateRef} className="flex flex-wrap gap-8">
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <ProjectImportItem key={`${item.id}-${item.status}`} item={item} />
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
