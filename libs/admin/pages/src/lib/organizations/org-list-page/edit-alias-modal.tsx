import { FormEventHandler, useState } from 'react';

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
import { useAtom } from 'jotai';

import { OrgDetails } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { editAliasAtom, useAddAlias } from '@jobstash/admin/state';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

export const EditAliasModal = () => {
  const [{ aliases, isOpen, org, originalAlias }, setEditAlias] =
    useAtom(editAliasAtom);

  const { orgId, name, website, logoUrl, location } = org;

  const hasAlias = aliases.length > 0;

  const [value, setValue] = useState('');

  const isDisabledSave =
    JSON.stringify(originalAlias) === JSON.stringify(aliases);

  const removeAlias = (currentAlias: string) => {
    setEditAlias((prev) => ({
      ...prev,
      aliases: prev.aliases.filter((prevAlias) => prevAlias !== currentAlias),
    }));
  };

  const addAlias = () => {
    const isDuplicate = aliases.includes(value);
    if (!isDuplicate && value) {
      setEditAlias((prev) => ({ ...prev, aliases: [...prev.aliases, value] }));
      setValue('');
    }
  };

  const onEnterAddAlias: FormEventHandler = (e) => {
    e.preventDefault();
    addAlias();
  };

  const onOpenChange = () => {
    setEditAlias((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const closeModal = () => {
    setEditAlias(() => ({
      org: {} as OrgDetails,
      aliases: [] as string[],
      originalAlias: [] as string[],
      isOpen: false,
    }));
  };

  const { mutate, isPending } = useAddAlias(closeModal);
  const onSave = () => {
    mutate({ orgId, aliases });
  };

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
                hasAlias ? 'Edit' : 'Add'
              } Alias`}</Heading>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-8">
              <LogoTitle
                title={name}
                location={location}
                avatarProps={{
                  src: getLogoUrl(website, logoUrl),
                  alt: name,
                }}
              />
              <div className="min-h-[40px] flex items-center">
                {hasAlias ? (
                  <div className="flex gap-x-2 gap-y-4 items-center flex-wrap">
                    {aliases.map((alias) => (
                      <div
                        key={alias}
                        className="cursor-pointer"
                        onClick={() => removeAlias(alias)}
                      >
                        <Tooltip content="Click to remove">
                          <Chip size="lg">{alias}</Chip>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="pl-2">--- No Alias Yet ---</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between w-full items-center">
                <form className="w-80" onSubmit={onEnterAddAlias}>
                  <Input
                    size="sm"
                    placeholder="Add new alias (Press Enter)"
                    classNames={{
                      inputWrapper: ['bg-darker-gray'],
                    }}
                    value={value}
                    endContent={
                      <Button
                        size="sm"
                        className="bg-transparent"
                        onClick={addAlias}
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
