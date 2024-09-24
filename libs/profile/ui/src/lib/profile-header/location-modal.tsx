import { use, useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { DevProfileInfo, LOCATION_FIELDS } from '@jobstash/profile/core';
import { capitalize } from '@jobstash/shared/utils';

import {
  useDevProfileInfoContext,
  useUpdateLocation,
} from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

type Location = DevProfileInfo['location'];
interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const LocationModal = (props: Props) => {
  const { isOpen, onOpenChange } = props;

  const { profileInfoData } = useDevProfileInfoContext();
  const [location, setLocation] = useState<
    DevProfileInfo['location'] | undefined
  >(profileInfoData?.location);

  const hasLocation = Boolean(location?.city) || Boolean(location?.country);
  const title = `${hasLocation ? 'Update' : 'Add'} Location`;

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prev) => {
      if (prev) {
        return {
          ...prev,
          [name]: value || null,
        };
      }
    });
  };

  const { isPending, mutate } = useUpdateLocation();

  const onSave = () => {
    if (location) {
      mutate(location, {
        onSuccess() {
          if (isOpen) {
            onOpenChange(false);
          }
        },
      });
    }
  };

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <Heading size="lg">{title}</Heading>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6">
              {LOCATION_FIELDS.map((name) => (
                <div key={name} className="h-10 min-h-[40px]">
                  <Input
                    name={name}
                    label={capitalize(name)}
                    size="sm"
                    value={(location as Location)[name as keyof Location] ?? ''}
                    //
                    isDisabled={isPending}
                    onChange={onChangeLocation}
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isPending}
                isDisabled={!hasLocation || isPending}
                onClick={onSave}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
