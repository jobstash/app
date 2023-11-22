import { useState } from 'react';

import { v4 } from '@lukeed/uuid';

import type { ProfileRepo, ProfileRepoTag } from '@jobstash/profile/core';
import { Tag } from '@jobstash/shared/core';
import { capitalize, slugify } from '@jobstash/shared/utils';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useTagsUsedMutation } from './use-tags-used-mutation';

const createTag = (searchValue: string): ProfileRepoTag => ({
  id: v4(),
  name: capitalize(searchValue),
  normalizedName: slugify(searchValue),
  canTeach: false,
});

const findTag = (allTags: Tag[], searchValue: string) =>
  allTags.find(
    (option) => option.name.toLowerCase() === searchValue?.toLowerCase(),
  );

const isTagExists = (currentTags: ProfileRepoTag[], searchValue: string) =>
  currentTags.some(
    (tag) => tag.name.toLowerCase() === searchValue.toLowerCase(),
  );

const isTagsEqual = (tags: ProfileRepoTag[], currentTags: ProfileRepoTag[]) =>
  JSON.stringify(tags) === JSON.stringify(currentTags);

const getTagOptions = (currentTags: ProfileRepoTag[], allTags: Tag[]) => {
  const usedIds = new Set(currentTags.map((tag) => tag.id));
  return allTags
    .filter((option) => !usedIds.has(option.id))
    .map((option) => option.name);
};

export const useTagsUsed = () => {
  const { activeProfileRepo: profileRepo, allTags } =
    useProfileRepoPageContext();
  const { id, tags } = profileRepo || ({} as ProfileRepo);

  const [tagsUsed, setTagsUsed] = useState<ProfileRepoTag[]>(tags);
  const [tagsCreated, setTagsCreated] = useState<ProfileRepoTag[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [hoverAddButton, setHoverAddButton] = useState(false);

  const onBlurSearch = () => {
    if (hoverAddButton) {
      const option = findTag(allTags, searchValue);
      if (option) {
        setTagsUsed((prev) => [...prev, { ...option, canTeach: false }]);
      } else {
        setTagsCreated((prev) => [...prev, createTag(searchValue)]);
      }
    }
  };

  const currentTags = [...tagsUsed, ...tagsCreated];
  const disableAdd = !searchValue || isTagExists(currentTags, searchValue);

  const onTagRemove = (id: string) => {
    const tagsUsedIds = new Set(tagsUsed.map((t) => t.id));
    if (tagsUsedIds.has(id)) {
      setTagsUsed(tagsUsed.filter((t) => t.id !== id));
    } else {
      setTagsCreated(tagsCreated.filter((t) => t.id !== id));
    }
  };

  const disableSave = isTagsEqual(tags, currentTags);
  const tagOptions = getTagOptions(currentTags, allTags);

  const { mutate } = useTagsUsedMutation();
  const onClickSave = () => {
    mutate({ id, tagsUsed, tagsCreated });
  };

  const onClickCanTeach = (id: string, canTeach: boolean) => {
    const tagsUsedIds = new Set(tagsUsed.map((t) => t.id));
    if (tagsUsedIds.has(id)) {
      setTagsUsed((prev) =>
        prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
      );
    } else {
      setTagsCreated((prev) =>
        prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
      );
    }
  };

  return {
    tagsUsed,
    tagsCreated,
    searchValue,
    setSearchValue,
    hoverAddButton,
    setHoverAddButton,
    onBlurSearch,
    currentTags,
    disableAdd,
    onTagRemove,
    disableSave,
    tagOptions,
    onClickSave,
    onClickCanTeach,
  };
};
