import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { TELEGRAM_URL } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';

import { Button as XButton } from '@jobstash/shared/ui';
import { Heading, Text } from '@jobstash/shared/ui';

export const NoticeModal = () => {
  const { flow } = useAuthContext();

  const isPendingOrg = flow === CHECK_WALLET_FLOWS.ORG_APPROVAL;
  const isRejectedOrg = flow === CHECK_WALLET_FLOWS.ORG_REJECTED;

  const [isOpen, setIsOpen] = useState(false);

  const noticeRef = useRef(false);
  useEffect(() => {
    if (!noticeRef.current && (isPendingOrg || isRejectedOrg)) {
      noticeRef.current = true;

      setIsOpen(true);
    }
  }, [isPendingOrg, isRejectedOrg]);

  const onOpenChange = () => setIsOpen((prev) => !prev);

  if (!isPendingOrg && !isRejectedOrg) return null;

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      className="p-4"
      size="2xl"
      classNames={{
        closeButton:
          'bg-transparent hover:bg-transparent active:bg-transparent',
      }}
      closeButton={
        <div className="m-10">
          <Button isIconOnly size="sm" variant="faded" onClick={onOpenChange}>
            <XMarkIcon className="h-6 w-6" />
          </Button>
        </div>
      }
      onOpenChange={onOpenChange}
    >
      <ModalContent className="flex flex-col gap-y-2">
        {() => (
          <>
            {/* <ModalHeader className="flex flex-col gap-1">
              <Heading size="sm">Give Your Profile a Quick Boost!</Heading>
            </ModalHeader> */}
            <ModalBody className="flex flex-col gap-12 pb-12">
              <div className="flex flex-col gap-4 items-center pt-12">
                <Image
                  priority
                  src={isPendingOrg ? '/rocket.png' : '/empty-result.png'}
                  quality={100}
                  alt={isPendingOrg ? 'Pending Approval' : 'Org Rejected'}
                  width={isPendingOrg ? 371 : 418}
                  height={isPendingOrg ? 371 : 297}
                />
                <div className="flex flex-col items-center gap-y-6 text-center">
                  <Heading size="xl" fw="bold">
                    {isPendingOrg
                      ? 'Pending Approval'
                      : "Sorry, We're Not There Yet"}
                  </Heading>
                  <div className="max-w-md text-center flex flex-col gap-4">
                    {isPendingOrg ? (
                      <>
                        <Text color="dimmed">
                          A well-crafted profile is your first step towards
                          success here. Ensure your approval by completing your
                          profile info today.
                        </Text>
                        <Text color="dimmed">
                          Soon, you&#39;ll be handpicking from the finest in
                          web3 space!
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text color="dimmed">
                          We&#39;ve rejected your request for now. We would like
                          to know you better. A more comprehensive profile might
                          lead to a positive reevaluation.
                        </Text>
                        <Text color="dimmed">
                          Rebuild your case with our team.
                        </Text>
                        <div className="pt-4 w-full flex justify-center">
                          <XButton variant="primary" onClick={openTelegramLink}>
                            <Heading size="xs" fw="bold">
                              Reach out to us
                            </Heading>
                          </XButton>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const openTelegramLink = () => {
  if (typeof window !== 'undefined') {
    window.open(TELEGRAM_URL, '_blank');
  }
};
