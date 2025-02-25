import { Button } from '@heroui/button';
import { useSetAtom } from 'jotai';
import { FilePenLine } from 'lucide-react';

import { OrgJobItem } from '@jobstash/organizations/core';

import { activeOrgJobAtom } from '@jobstash/organizations/state';

import { editModalAtom } from './atoms';

interface Props {
  orgJob: OrgJobItem;
}

export const OrgJobEditButton = ({ orgJob }: Props) => {
  const setEditModal = useSetAtom(editModalAtom);
  const setActiveJob = useSetAtom(activeOrgJobAtom);
  const onOpen = () => {
    setEditModal(() => ({ orgJob, isOpen: true }));
    setActiveJob(orgJob);
  };

  return (
    <Button
      size="sm"
      className="bg-white/10 font-bold"
      startContent={<FilePenLine className="h-3.5 w-3.5" />}
      onClick={onOpen}
    >
      Edit
    </Button>
  );
};
