import { useEffect, useState, useTransition } from 'react';

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { useAtom } from 'jotai';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import {
  orgApprovalProfileAtom,
  useAllOrgs,
  useAuthorizeOrg,
} from '@jobstash/admin/state';

import { Heading, LogoTitle, Text } from '@jobstash/shared/ui';

export const ApproveOrgModal = () => {
  const [
    {
      org: { wallet, email, linkedin, calendly, contact, internalReference },
      isOpen,
    },
    setOrgApprovalProfile,
  ] = useAtom(orgApprovalProfileAtom);

  const onOpenChange = () => {
    setOrgApprovalProfile((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  const { data: allOrgs, isPending } = useAllOrgs();

  const [filteredItems, setFilteredItems] = useState<
    (OrgItem & { value: string })[]
  >([]);
  const [isPendingFilter, startTransition] = useTransition();

  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
  });

  useEffect(() => {
    startTransition(() => {
      const filteredOrgs =
        allOrgs && fieldState.inputValue.length > 1
          ? allOrgs
              .map((org) => ({ ...org, value: org.orgId }))
              .filter((org) =>
                org.name
                  .toLowerCase()
                  .includes(fieldState.inputValue.toLowerCase()),
              )
          : [];

      setFilteredItems(filteredOrgs);
    });
  }, [allOrgs, fieldState.inputValue]);

  const onSelectionChange = (key: React.Key | null) => {
    setFieldState(() => {
      const item = filteredItems.find((org) => org.orgId === key);
      setSelectedOrg(item?.orgId ?? null);
      return {
        inputValue: item?.name || '',
        selectedKey: key as string | null,
      };
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prev) => ({
      inputValue: value,
      selectedKey: value === '' ? null : prev.selectedKey,
    }));
  };

  const { isPending: isPendingMutation, mutate } =
    useAuthorizeOrg(onOpenChange);

  const onSubmit = () => {
    if (wallet && selectedOrg) {
      mutate({ wallet, verdict: 'approve', orgId: selectedOrg });
    }
  };

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      backdrop="blur"
      className="p-4"
      size="4xl"
      placement="top"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="flex flex-col gap-y-2">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Heading size="sm">Approve Org User</Heading>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <div className="min-h-[250px]">
                <Tabs
                  size="lg"
                  aria-label="Approve Org User"
                  // ClassNames={{ cursor: 'bg-dark' }}
                  variant="underlined"
                  classNames={{ panel: 'pl-6' }}
                >
                  <Tab key="user" title="User">
                    <div className="flex flex-col gap-4 pt-4">
                      <Text>Wallet: {wallet ?? 'N/A'}</Text>
                      <Text>
                        Email: {email.length > 0 ? email[0].email : 'N/A'}
                      </Text>
                      <Text>LinkedIn: {linkedin ?? 'N/A'}</Text>
                      <Text>Calendly: {calendly ?? 'N/A'}</Text>
                      <Text>{`Contact (${contact.preferred}): ${contact.value}`}</Text>
                    </div>
                  </Tab>
                  <Tab key="reference" title="Reference">
                    <div className="flex flex-col gap-4 pt-4">
                      {internalReference.referencePersonName && (
                        <Text>
                          Name: {internalReference.referencePersonName}
                        </Text>
                      )}
                      {internalReference.referencePersonRole && (
                        <Text>
                          Role: {internalReference.referencePersonRole}
                        </Text>
                      )}
                      {internalReference.referenceContact && (
                        <Text>
                          Contact: {internalReference.referenceContact}
                        </Text>
                      )}
                      {internalReference.referenceContactPlatform && (
                        <Text>
                          Contact Platform:{' '}
                          {internalReference.referenceContactPlatform}
                        </Text>
                      )}
                      {!internalReference.referencePersonName &&
                        !internalReference.referencePersonRole &&
                        !internalReference.referenceContact &&
                        !internalReference.referenceContactPlatform &&
                        'N/A'}
                    </div>
                  </Tab>
                </Tabs>
              </div>

              <div>
                <Autocomplete
                  size="lg"
                  className="max-w-xs"
                  label="Select Org"
                  description={
                    allOrgs
                      ? `There are ${allOrgs.length} orgs in total`
                      : undefined
                  }
                  listboxProps={{
                    emptyContent: 'Type atleast 2 letters to show results',
                  }}
                  placeholder="Type here ..."
                  variant="bordered"
                  isLoading={isPending || isPendingFilter}
                  isDisabled={isPending}
                  items={filteredItems}
                  inputValue={fieldState.inputValue}
                  selectedKey={fieldState.selectedKey}
                  onInputChange={onInputChange}
                  onSelectionChange={onSelectionChange}
                >
                  {({ value, name, location, websites, logoUrl }) => (
                    <AutocompleteItem key={value}>
                      <LogoTitle
                        title={name}
                        location={location}
                        avatarProps={{
                          alt: name,
                          src: getLogoUrl(
                            websites.length > 0 ? websites[0] : '',
                            logoUrl,
                          ),
                        }}
                      />
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    isLoading={isPendingMutation}
                    isDisabled={!selectedOrg || isPendingMutation}
                    onClick={onSubmit}
                  >
                    Approve
                  </Button>
                  <Button size="sm" variant="flat" onClick={onClose}>
                    Cancel
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

type FieldState = {
  selectedKey: string | null;
  inputValue: string;
};
