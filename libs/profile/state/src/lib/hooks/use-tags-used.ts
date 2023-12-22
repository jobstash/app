import { useEffect, useState } from 'react';

import type { ProfileRepo, ProfileRepoTag } from '@jobstash/profile/core';
import { Tag } from '@jobstash/shared/core';
import { tagSortFn } from '@jobstash/profile/utils';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';
import { SkillsUsedContextProps } from '../contexts/skills-used-context';

import { useTagsUsedMutation } from './use-tags-used-mutation';

const findTag = (allTags: Tag[], searchValue: string) =>
  allTags.find(
    (option) => option.name.toLowerCase() === searchValue?.toLowerCase(),
  );

const isTagExists = (tagsUsed: ProfileRepoTag[], searchValue: string) =>
  tagsUsed.some((tag) => tag.name.toLowerCase() === searchValue.toLowerCase());

const getTagOptions = (tagsUsed: ProfileRepoTag[], allTags: Tag[]) => {
  const usedIds = new Set(tagsUsed.map((tag) => tag.id));
  return allTags
    .filter((option) => !usedIds.has(option.id))
    .map((option) => option.name);
};

export const useTagsUsed = (): SkillsUsedContextProps => {
  const {
    activeProfileRepo: profileRepo,
    allTags,
    userSkills,
    mutateSkills,
  } = useProfileRepoPageContext();
  const { id, tags } = profileRepo || ({} as ProfileRepo);

  const [tagsUsed, setTagsUsed] = useState<ProfileRepoTag[]>(
    tags.sort(tagSortFn),
  );
  useEffect(() => {
    if (tags) {
      setTagsUsed(tags.sort(tagSortFn));
    }
  }, [tags]);

  const [searchValue, setSearchValue] = useState<string>('');

  const disableAdd = !searchValue || isTagExists(tagsUsed, searchValue);

  const onTagSelect = (name: string) => {
    const tag = findTag(allTags, name);
    if (tag) setTagsUsed((prev) => [...prev, { ...tag, canTeach: false }]);
  };

  const onTagRemove = (id: string) => {
    setTagsUsed(tagsUsed.filter((t) => t.id !== id));
  };

  const tagOptions = getTagOptions(tagsUsed, allTags);

  const { mutate } = useTagsUsedMutation();
  const onClickSave = () => {
    mutate({ id, tagsUsed });
  };

  const onClickCanTeach = (id: string, canTeach: boolean) => {
    setTagsUsed((prev) =>
      prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
    );

    mutateSkills({
      skills: userSkills.map((t) => (t.id === id ? { ...t, canTeach } : t)),
    });
  };

  return {
    tagsUsed,
    searchValue,
    setSearchValue,
    disableAdd,
    onTagSelect,
    onTagRemove,
    tagOptions,
    onClickSave,
    onClickCanTeach,
  };
};
