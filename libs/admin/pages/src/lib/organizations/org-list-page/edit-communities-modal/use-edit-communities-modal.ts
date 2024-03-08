import { useState } from 'react';

import { useAtom } from 'jotai';

import { OrgListItem } from '@jobstash/organizations/core';

import { editCommunitiesAtom, useSetCommunities } from '@jobstash/admin/state';

export const useEditCommunitiesModal = () => {
  const [{ communities, isOpen, org }, setAtomValue] =
    useAtom(editCommunitiesAtom);

  const { orgId, community: originalCommunities } = org;

  const hasCommunities = communities.length > 0;

  const [value, setValue] = useState('');

  const isDisabledSave =
    JSON.stringify(originalCommunities) === JSON.stringify(communities);

  const removeCommunity = (community: string) => {
    setAtomValue((prev) => ({
      ...prev,
      communities: prev.communities.filter(
        (prevCommunities) => prevCommunities !== community,
      ),
    }));
  };

  const addCommunity = () => {
    const isDuplicate = communities.includes(value);
    if (!isDuplicate && value) {
      setAtomValue((prev) => ({
        ...prev,
        communities: [...prev.communities, value],
      }));
      setValue('');
    }
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addCommunity();
  };

  const onOpenChange = () => {
    setAtomValue((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const closeModal = () => {
    setAtomValue(() => ({
      org: {} as OrgListItem,
      communities: [] as string[],
      isOpen: false,
    }));
  };

  const { mutate, isPending } = useSetCommunities(closeModal);
  const onSave = () => {
    mutate({ orgId, communities });
  };

  return {
    isOpen,
    onOpenChange,
    hasCommunities,
    org,
    communities,
    removeCommunity,
    onSubmit,
    value,
    setValue,
    isDisabledSave,
    isPending,
    onSave,
  };
};
