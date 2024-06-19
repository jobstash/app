import { useEffect } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useAtom } from 'jotai';

import {
  NEW_FEATURE_DESCRIPTION,
  NEW_FEATURE_TITLE,
} from '@jobstash/shared/core';
import { getLocalStorageValue } from '@jobstash/shared/utils';

import { newFeatureIsOpenAtom } from '@jobstash/shared/state';

import Heading from '../base/heading';
import Text from '../base/text';

const LS_KEY = 'new-feature-key';
const HEADER_TEXT = 'Hey! check out our new feature:';

export const NewFeatureModal = () => {
  const [isOpenAtom, setIsOpenAtom] = useAtom(newFeatureIsOpenAtom);

  const title = NEW_FEATURE_TITLE;
  const description = NEW_FEATURE_DESCRIPTION;
  const current = JSON.stringify({ title, description });
  const lastSeen = getLocalStorageValue(LS_KEY);
  const defaultOpen = current !== lastSeen;

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultOpen,
  });

  // Need to sync atom because it's used in multiple places
  useEffect(() => {
    if (isOpen !== isOpenAtom) setIsOpenAtom(isOpen);
  }, [isOpen, isOpenAtom, setIsOpenAtom]);

  useEffect(() => {
    if (current !== lastSeen) {
      onOpen();
      localStorage.setItem(LS_KEY, current);
    }
  }, [current, lastSeen, onOpen]);

  const handleClose = () => {
    onClose();
    localStorage.setItem(LS_KEY, current);
  };

  const onOpenChange = (isOpen: boolean) => {
    isOpen ? onOpen() : handleClose();
  };

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      size="2xl"
      classNames={{
        base: 'p-2 flex flex-col gap-4',
      }}
      style={{
        zIndex: 9999,
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Text color="dimmed" size="lg">
                {HEADER_TEXT}
              </Text>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 w-full items-center justify-center">
                <Heading size="xl" fw="bold" className="space-x-6">
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                  <span>{title}</span>
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                </Heading>

                <span className="max-w-[56ch] text-center">{description}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="lg" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
