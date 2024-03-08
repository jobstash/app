import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Input } from '@nextui-org/input';
import { Kbd } from '@nextui-org/kbd';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { Tooltip } from '@nextui-org/react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { useEditCommunitiesModal } from './use-edit-communities-modal';

export const EditCommunitiesModal = () => {
  const {
    isOpen,
    onOpenChange,
    hasCommunities,
    org: { name, location, url, logoUrl },
    communities,
    addCommunity,
    removeCommunity,
    onSubmit,
    value,
    setValue,
    isDisabledSave,
    isPending,
    onSave,
  } = useEditCommunitiesModal();

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      backdrop="blur"
      className="p-4"
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="flex flex-col gap-y-2">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Heading size="sm">{`${
                hasCommunities ? 'Edit' : 'Add'
              } Communities`}</Heading>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-8">
              <LogoTitle
                title={name}
                location={location}
                avatarProps={{
                  src: getLogoUrl(url, logoUrl),
                  alt: name,
                }}
              />
              <div className="min-h-[40px] flex items-center">
                {hasCommunities ? (
                  <div className="flex gap-x-2 gap-y-4 items-center flex-wrap">
                    {communities.map((community) => (
                      <div
                        key={community}
                        className="cursor-pointer"
                        onClick={() => removeCommunity(community)}
                      >
                        <Tooltip content="Click to remove">
                          <Chip size="lg">{community}</Chip>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="pl-2 text-white/40">
                    Wow so empty. Start adding communities.
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between w-full items-center">
                <form className="w-80" onSubmit={onSubmit}>
                  <Input
                    size="sm"
                    placeholder="Add new community (Press Enter)"
                    classNames={{
                      inputWrapper: ['bg-darker-gray'],
                    }}
                    value={value}
                    endContent={
                      <Button
                        size="sm"
                        className="bg-transparent"
                        onClick={addCommunity}
                      >
                        <Kbd keys={['enter']}>Add</Kbd>
                      </Button>
                    }
                    onValueChange={setValue}
                  />
                </form>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    isDisabled={isDisabledSave}
                    isLoading={isPending}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button size="sm" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
