import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { DUCK_TELEGRAM_URL } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';

import { Button as XButton } from '@jobstash/shared/ui';
import { Heading, Text } from '@jobstash/shared/ui';

export const NoticeModal = () => {
  const { flow } = useAuthContext();

  const isComplete = flow === CHECK_WALLET_FLOWS.ORG_COMPLETE;
  const isOrgModalFlow = orgModalFlows.includes(flow as OrgModalFlow);

  const [isOpen, setIsOpen] = useState(true);

  const noticeRef = useRef(false);
  useEffect(() => {
    if (!noticeRef.current && isOrgModalFlow) {
      noticeRef.current = true;

      setIsOpen(true);
    }
  }, [isOrgModalFlow]);

  const onOpenChange = () => setIsOpen((prev) => !prev);

  if (isComplete) return null;

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
          <ModalBody className="flex flex-col gap-12 pb-12">
            <div className="flex flex-col gap-4 items-center pt-12">
              <Image
                priority
                src={orgFlowMap[flow as OrgModalFlow].src}
                quality={100}
                alt={orgFlowMap[flow as OrgModalFlow].alt}
                width={orgFlowMap[flow as OrgModalFlow].width}
                height={orgFlowMap[flow as OrgModalFlow].height}
              />
              <div className="flex flex-col items-center gap-y-6 text-center">
                <Heading size="xl" fw="bold">
                  {orgFlowMap[flow as OrgModalFlow].title}
                </Heading>
                <div className="max-w-md text-center flex flex-col gap-4">
                  {orgFlowMap[flow as OrgModalFlow].content}
                </div>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

const openTelegramLink = () => {
  if (typeof window !== 'undefined') {
    window.open(DUCK_TELEGRAM_URL, '_blank');
  }
};

const orgModalFlows = [
  CHECK_WALLET_FLOWS.ORG_PROFILE,
  CHECK_WALLET_FLOWS.ORG_APPROVAL,
  CHECK_WALLET_FLOWS.ORG_REJECTED,
];

type OrgModalFlow = typeof orgModalFlows[number];

const orgFlowMap: Record<
  OrgModalFlow,
  {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    content: React.ReactNode;
  }
> = {
  [CHECK_WALLET_FLOWS.ORG_PROFILE]: {
    src: '/rocket.png',
    alt: 'Setup Profile',
    width: 371,
    height: 371,
    title: 'Setup Your Profile',
    content: (
      <>
        <Text color="dimmed">
          A well-crafted profile is is more likely to get approved.
        </Text>
        <Text color="dimmed">
          Complete your profile to enhance visibility. Take a moment to ensure
          every section of your profile is filled out with care.
        </Text>
      </>
    ),
  },
  [CHECK_WALLET_FLOWS.ORG_APPROVAL]: {
    src: '/rocket.png',
    alt: 'Pending Approval',
    width: 371,
    height: 371,
    title: 'Pending Approval',
    content: (
      <>
        <Text color="dimmed">
          Your profile is pending review. Rest assured, we are on it and will
          provide you with updates on your approval status as soon as we can.
        </Text>
        <Text color="dimmed">
          Soon, you&#39;ll be handpicking from the finest in web3 space!
        </Text>
      </>
    ),
  },
  [CHECK_WALLET_FLOWS.ORG_REJECTED]: {
    src: '/empty-result.png',
    alt: 'Org Rejected',
    width: 418,
    height: 297,
    title: "Sorry, We're Not There Yet",
    content: (
      <>
        <Text color="dimmed">
          We&#39;ve rejected your request for now. We would like to know you
          better. A more comprehensive profile might lead to a positive
          reevaluation.
        </Text>
        <Text color="dimmed">Rebuild your case with our team.</Text>
        <div className="pt-4 w-full flex justify-center">
          <XButton variant="primary" onClick={openTelegramLink}>
            <Heading size="xs" fw="bold">
              Reach out to us
            </Heading>
          </XButton>
        </div>
      </>
    ),
  },
};
