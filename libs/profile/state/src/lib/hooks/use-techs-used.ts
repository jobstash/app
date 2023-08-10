import { useState } from 'react';

import { v4 } from '@lukeed/uuid';

import type {
  ProfileRepo,
  ProfileRepoTechnology,
  TechsUsedContextProps,
  TechsUsedProps,
} from '@jobstash/profile/core';
import { Technology } from '@jobstash/shared/core';
import { capitalize, slugify } from '@jobstash/shared/utils';

import { useTechsUsedMutation } from './use-techs-used-mutation';

const createTech = (searchValue: string): ProfileRepoTechnology => ({
  id: v4(),
  name: capitalize(searchValue),
  normalizedName: slugify(searchValue),
  canTeach: false,
});

const findTech = (allTechs: Technology[], searchValue: string) =>
  allTechs.find(
    (option) => option.name.toLowerCase() === searchValue?.toLowerCase(),
  );

const isTechExists = (
  currentTechs: ProfileRepoTechnology[],
  searchValue: string,
) =>
  currentTechs.some(
    (tech) => tech.name.toLowerCase() === searchValue.toLowerCase(),
  );

const isTechsEqual = (
  techs: ProfileRepoTechnology[],
  currentTechs: ProfileRepoTechnology[],
) => JSON.stringify(techs) === JSON.stringify(currentTechs);

const getTechOptions = (
  currentTechs: ProfileRepoTechnology[],
  allTechs: Technology[],
) => {
  const usedIds = new Set(currentTechs.map((tech) => tech.id));
  return allTechs
    .filter((option) => !usedIds.has(option.id))
    .map((option) => option.name);
};

export const useTechsUsed = ({
  allTechs,
  profileRepo,
}: TechsUsedProps): TechsUsedContextProps => {
  const { id, technologies: techs } = profileRepo || ({} as ProfileRepo);

  const [techsUsed, setTechsUsed] = useState<ProfileRepoTechnology[]>(techs);
  const [techsCreated, setTechsCreated] = useState<ProfileRepoTechnology[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [hoverAddButton, setHoverAddButton] = useState(false);

  const onBlurSearch = () => {
    if (hoverAddButton) {
      const option = findTech(allTechs, searchValue);
      if (option) {
        setTechsUsed((prev) => [...prev, { ...option, canTeach: false }]);
      } else {
        setTechsCreated((prev) => [...prev, createTech(searchValue)]);
      }
    }
  };

  const currentTechs = [...techsUsed, ...techsCreated];
  const disableAdd = !searchValue || isTechExists(currentTechs, searchValue);

  const onTechRemove = (id: string) => {
    const techsUsedIds = new Set(techsUsed.map((t) => t.id));
    if (techsUsedIds.has(id)) {
      setTechsUsed(techsUsed.filter((t) => t.id !== id));
    } else {
      setTechsCreated(techsCreated.filter((t) => t.id !== id));
    }
  };

  const disableSave = isTechsEqual(techs, currentTechs);
  const techOptions = getTechOptions(currentTechs, allTechs);

  const { isLoading, mutate } = useTechsUsedMutation();

  const onClickSave = () => {
    mutate({ id, techsUsed, techsCreated });
  };

  const onClickCanTeach = (id: string, canTeach: boolean) => {
    const techsUsedIds = new Set(techsUsed.map((t) => t.id));
    if (techsUsedIds.has(id)) {
      setTechsUsed((prev) =>
        prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
      );
    } else {
      setTechsCreated((prev) =>
        prev.map((t) => (t.id === id ? { ...t, canTeach } : t)),
      );
    }
  };

  return {
    techsUsed,
    techsCreated,
    searchValue,
    setSearchValue,
    hoverAddButton,
    setHoverAddButton,
    onBlurSearch,
    currentTechs,
    disableAdd,
    onTechRemove,
    disableSave,
    techOptions,
    isLoading,
    onClickSave,
    onClickCanTeach,
  };
};
