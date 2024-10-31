import Link from 'next/link';
import { useEffect } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useAtom } from 'jotai';

import { isOpenDonateModalAtom } from '@jobstash/shared/state';

import { FoxSVG } from './fox-svg';

const JOBSTASH_LINK = 'https://explorer.gitcoin.co/#/round/42161/608/87';
const GITCOINDONORDATA_LINK = 'https://explorer.gitcoin.co/#/round/42161/636/3';

const onDonate = () => {
  if (typeof window !== 'undefined') {
    window.open(GITCOINDONORDATA_LINK, '_blank');
  }
};

export const DonateModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenDonateModalAtom);

  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return (
    <Modal
      isDismissable
      hideCloseButton
      isOpen={isOpen}
      className="text-white p-4"
      backdrop="blur"
      size="xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody className="flex flex-col gap-4">
          <span className="text-3xl font-bold pb-4 text-center">
            <span role="img" aria-label="Shimmer">
              ❤️
            </span>{' '}
            Support Our Free Platform
          </span>
          <div className="w-full flex justify-center">
            <FoxSVG isMobile={false} />
          </div>
          <span className="text-lg text-left">
            Enjoying direct links to job applications? To keep this service free
            and continually improving, we rely on community support.
          </span>
          <span className="text-lg text-left">
            If you find value in what we offer, please consider making a small
            donation to one of our projects below:
          </span>
          <div className="flex flex-col gap-2 pl-8">
            <ul className="list-disc">
              <li>
                <Link
                  href={JOBSTASH_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  JobStash
                </Link>
              </li>

              <li>
                <Link
                  href={GITCOINDONORDATA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  GitcoinDonorData
                </Link>
              </li>
            </ul>
          </div>
          <span className="text-lg text-left">
            Thank you for helping us keep this platform free and accessible!
          </span>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Maybe next time
          </Button>
          <Button
            className="bg-gradient-to-l from-primary to-tertiary font-bold"
            onPress={onDonate}
          >
            Donate Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
