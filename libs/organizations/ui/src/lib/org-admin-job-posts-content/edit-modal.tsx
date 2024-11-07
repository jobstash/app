import { Modal, ModalContent } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';

import { EDIT_ACTIVE_TABS, editActiveTabAtom, editModalAtom } from './atoms';
import { EditModalContent } from './edit-modal-content';
import { EditModalTabs } from './edit-modal-tabs';

export const OrgJobEditModal = () => {
  const setEditActiveTab = useSetAtom(editActiveTabAtom);
  const [{ isOpen, orgJob }, setEditModal] = useAtom(editModalAtom);

  const onOpenChange = (open: boolean) => {
    setEditModal((prev) => {
      const newOrgJob = open ? prev.orgJob : null;
      return { orgJob: newOrgJob, isOpen: open };
    });
    if (!open) setEditActiveTab(EDIT_ACTIVE_TABS.MAIN);
  };

  if (!orgJob) return null;

  return (
    <Modal
      hideCloseButton
      disableAnimation
      shouldBlockScroll
      size="4xl"
      backdrop="blur"
      placement="top"
      className="text-white p-2"
      classNames={{
        wrapper: 'mt-12',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <EditModalTabs />
        <EditModalContent orgJob={orgJob} />
      </ModalContent>
    </Modal>
  );
};
