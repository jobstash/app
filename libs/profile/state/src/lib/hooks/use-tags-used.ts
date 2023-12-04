import { useState } from 'react';

import type { ProfileRepo, ProfileRepoTag } from '@jobstash/profile/core';
import { Tag } from '@jobstash/shared/core';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useTagsUsedMutation } from './use-tags-used-mutation';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [hoverAddButton, setHoverAddButton] = useState(false);

  const onBlurSearch = () => {
    if (hoverAddButton) {
      const currentTag = findTag(allTags, searchValue);
      if (currentTag) {
        setTagsUsed((prev) => [...prev, { ...currentTag, canTeach: false }]);
      }
    }
  };

  const currentTags = [...tagsUsed];
  const disableAdd = !searchValue || isTagExists(currentTags, searchValue);

  const onTagRemove = (id: string) => {
    setTagsUsed(tagsUsed.filter((t) => t.id !== id));
  };

  const disableSave = isTagsEqual(tags, currentTags);
  const tagOptions = getTagOptions(currentTags, allTags);

  const { mutate } = useTagsUsedMutation();
  const onClickSave = () => {
    mutate({ id, tagsUsed });
  };

  const onClickCanTeach = (id: string, canTeach: boolean) => {
    setTagsUsed((prev) =>
      prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
    );
  };

  return {
    tagsUsed,
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
