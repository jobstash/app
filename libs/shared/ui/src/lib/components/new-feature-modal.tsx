import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useAtom } from 'jotai';

import { lato, NEW_FEATURE_DIFF } from '@jobstash/shared/core';
import { cn, getLocalStorageValue } from '@jobstash/shared/utils';

import { newFeatureIsOpenAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const LS_KEY = 'new-feature-key';

const TITLE = 'Leave an anonymous review for your last job!';
const CTA_TEXT = 'To reviews..';
const CTA_LINK = '/organizations';

export const NewFeatureModal = () => {
  const router = useRouter();
  const [isOpenAtom, setIsOpenAtom] = useAtom(newFeatureIsOpenAtom);

  const current = JSON.stringify({ diff: NEW_FEATURE_DIFF });
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

  const hasCTA = CTA_TEXT && CTA_LINK;
  const onClickCTA = () => {
    if (hasCTA) {
      handleClose();
      router.push(CTA_LINK);
    }
  };

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      size="2xl"
      classNames={{
        base: 'px-1 md:px-4 pt-2 pb-4 flex flex-col m-4 md:pb-8',
      }}
      style={{
        zIndex: 9999,
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="md:gap-y-4">
        {() => (
          <>
            <ModalBody>
              <div className="flex flex-col w-full pt-0 sm:pt-4">
                <div
                  className={cn(
                    'font-bold text-white text-xl sm:text-3xl flex items-center justify-center space-x-2 md:space-x-4 pb-6 md:pb-8',
                    lato.className,
                  )}
                >
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                  <span className="leading-tight text-lg sm:text-3xl text-center shrink-0">
                    {TITLE}
                  </span>
                  <span role="img" aria-label="Shimmer">
                    ✨
                  </span>
                </div>

                <div className="max-w-fit flex flex-col gap-4">
                  <ContentText>
                    On JobStash you can leave an anonymous review for your last
                    job to help others make better decisions.
                  </ContentText>

                  <div className="flex flex-col gap-2">
                    <ContentText>You can tell others about: </ContentText>
                    <ul className="space-y-1 list-disc list-outside pl-6">
                      <li>
                        <ContentText>
                          Companensation: What you got payed and if it included
                          token allocations
                        </ContentText>
                      </li>
                      <li>
                        <ContentText>
                          Rating: A star rating from 1 to 5 on various metrics
                        </ContentText>
                      </li>
                    </ul>
                  </div>

                  <ContentText>
                    To qualify, you need a currently valid professional email
                    for that organization, or have github activity in public
                    repos owned by that organization
                  </ContentText>

                  <ContentText>
                    In the organization page, pick an organization, and go to
                    the review tab, and click on the "Leave a review" button to
                    get started!
                  </ContentText>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-4 justify-center p-0 pt-2">
              {hasCTA && (
                <Button
                  size="md"
                  className="md:w-1/5 bg-gradient-to-l from-primary to-tertiary font-bold"
                  onClick={onClickCTA}
                >
                  {CTA_TEXT}
                </Button>
              )}
              <Button
                size="md"
                className="md:w-1/5 font-bold"
                onClick={onClose}
              >
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const ContentText = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-sm sm:text-lg">{children}</Text>
);
