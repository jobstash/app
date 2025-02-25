import Link from 'next/link';

import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/modal';

import { AffiliatedOrganization } from '@jobstash/auth/core';
import { CALENDLY_SCHEDULE_LINK } from '@jobstash/shared/core';

import { useRequestOrgAdminPermission } from '@jobstash/profile/state';

import { RequestAccessTrigger } from './request-access-trigger';

interface Props {
  org: AffiliatedOrganization;
}

export const RequestAccessModal = ({ org }: Props) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate, isPending } = useRequestOrgAdminPermission(org.id);

  const onRequestAccess = () => {
    mutate();
    onClose();
  };

  return (
    <>
      <div className="block">
        <RequestAccessTrigger
          orgId={org.id}
          slug={org.slug}
          openModal={onOpen}
        />
      </div>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        className="text-white p-2"
        backdrop="blur"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-3xl font-bold">Request Access</span>
              </ModalHeader>
              <ModalBody>
                <span className="text-white/90">
                  To ensure a secure and meaningful collaboration, we&#39;re
                  currently vetting organization administrators.
                </span>
                <span className="text-white/90">
                  Scheduling a brief meeting helps us understand your needs and
                  provide you with the right level of access.
                </span>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  isDisabled={isPending}
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  as={Link}
                  href={CALENDLY_SCHEDULE_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold"
                  isDisabled={isPending}
                  onPress={onRequestAccess}
                >
                  Schedule Meeting
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
