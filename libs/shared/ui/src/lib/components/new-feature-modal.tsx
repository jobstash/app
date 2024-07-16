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

  if (!title) return null;

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      size="2xl"
      classNames={{
        base: 'px-4 pt-2 pb-4 flex flex-col m-4 md:pb-8',
      }}
      style={{
        zIndex: 9999,
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="md:gap-y-4">
        {() => (
          <>
            <ModalHeader className="pb-0">
              <Text
                color="dimmed"
                className="w-full text-center md:text-[20px] md:pb-2"
              >
                {HEADER_TEXT}
              </Text>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center w-full">
                <Heading
                  size="md"
                  fw="bold"
                  className="pb-3 space-x-2 md:space-x-4 md:pb-8 md:text-[35px]"
                >
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                  <span>{title}</span>
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                </Heading>

                {description && (
                  <span className="text-center max-w-fit text-md md:text-lg">
                    {description}
                  </span>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center p-0 pt-2">
              <Button size="md" className="md:w-1/3" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
