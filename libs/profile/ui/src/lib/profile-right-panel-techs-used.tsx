import { memo, useCallback, useMemo, useState } from 'react';

import { v4 } from '@lukeed/uuid';
import { LoadingOverlay, Select } from '@mantine/core';

import {
  type ProfileRepo,
  type ProfileRepoTechnology,
} from '@jobstash/profile/core';
import { type Technology } from '@jobstash/shared/core';
import { capitalize, cn, slugify } from '@jobstash/shared/utils';

import { useTechsUsedMutation } from '@jobstash/profile/state';

import { Button, Heading, Text } from '@jobstash/shared/ui';

import ProfileRepoTech from './profile-repo-tech';

interface Props {
  options: Technology[];
  profileRepo: ProfileRepo | null;
}

const ProfileRightPanelTechsUsed = ({ options, profileRepo }: Props) => {
  const { id, technologies: techs } = profileRepo || ({} as ProfileRepo);

  const [techsUsed, setTechsUsed] = useState<ProfileRepoTechnology[]>(techs);
  const [techsCreated, setTechsCreated] = useState<ProfileRepoTechnology[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');

  const [hoverAddButton, setHoverAddButton] = useState(false);

  const onBlurSearch = useCallback(() => {
    if (hoverAddButton) {
      const option = options.find(
        (option) => option.name.toLowerCase() === searchValue?.toLowerCase(),
      );

      if (option) {
        setTechsUsed((prev) => [...prev, { ...option, canTeach: false }]);
      } else {
        setTechsCreated((prev) => [
          ...prev,
          {
            id: v4(),
            name: capitalize(searchValue as string),
            normalizedName: slugify(searchValue as string),
            canTeach: false,
          },
        ]);
      }
    }
  }, [hoverAddButton, options, searchValue]);

  const disableAdd = useMemo(() => {
    if (
      [...techsUsed, ...techsCreated].some(
        (tech) => tech.name.toLowerCase() === searchValue.toLowerCase(),
      )
    ) {
      return true;
    }

    return !searchValue;
  }, [techsCreated, searchValue, techsUsed]);

  const onTechRemove = useCallback(
    (id: string) => {
      const techsUsedIds = new Set(techsUsed.map((t) => t.id));

      if (techsUsedIds.has(id)) {
        setTechsUsed(techsUsed.filter((t) => t.id !== id));
      } else {
        setTechsCreated(techsCreated.filter((t) => t.id !== id));
      }
    },
    [techsCreated, techsUsed],
  );

  const disableSave = useMemo(() => {
    const techsIds = new Set(techs.map((t) => t.id));
    const usedIds = [
      ...techsUsed.map((t) => t.id),
      ...techsCreated.map((t) => t.id),
    ];

    if (techsIds.size !== usedIds.length) {
      return false;
    }

    let foundCount = 0;
    for (const usedId of usedIds) {
      if (!techsIds.has(usedId)) {
        return false;
      }

      foundCount += 1;
    }

    return foundCount === techs.length;
  }, [techsCreated, techs, techsUsed]);

  const techOptions = useMemo(() => {
    const usedIds = new Set([
      ...techsCreated.map((tech) => tech.id),
      ...techsUsed.map((t) => t.id),
    ]);

    const result: string[] = [];
    for (const option of options) {
      if (usedIds.has(option.id)) {
        continue;
      }

      result.push(option.name);
    }

    return result;
  }, [techsCreated, options, techsUsed]);

  const { isLoading, mutate } = useTechsUsedMutation();

  const onClickSave = useCallback(() => {
    mutate({
      id,
      techsUsed,
      techsCreated,
    });
  }, [id, mutate, techsCreated, techsUsed]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />

      <Heading size="lg" fw="semibold">
        Technologies Used
      </Heading>

      <div className="w-[90%] flex flex-col space-y-6 ">
        <Text color="dimmed">
          Please tell us about which Technologies you used to build this
          project.
        </Text>
        <Text color="dimmed">
          We use these Technologies to show you relevant projects, and if you
          mark yourself as available for work, we show these to our partner
          Organizations.
        </Text>

        <Select
          searchable
          data={techOptions}
          placeholder="Add technology used"
          size="lg"
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
            ),
            itemsWrapper: 'bg-dark-gray',
            item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
          }}
          rightSection={
            <div key={searchValue} className="-ml-6 z-[99999]">
              <Button
                isActive
                variant="primary"
                className="bg-dark-gray hover:bg-gray"
                isDisabled={disableAdd}
                onMouseEnter={() => {
                  setHoverAddButton(true);
                }}
                onMouseLeave={() => {
                  setHoverAddButton(false);
                }}
              >
                Add
              </Button>
            </div>
          }
          onSearchChange={(v) => {
            setSearchValue(v);
          }}
          onBlur={onBlurSearch}
        />

        <div className="flex flex-wrap gap-4 items-center">
          {[...techsUsed, ...techsCreated].map(({ id, name, canTeach }) => (
            <ProfileRepoTech
              key={id}
              id={id}
              name={name}
              canTeach={canTeach}
              onTechRemove={onTechRemove}
            />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <Button
            variant="primary"
            className="px-8"
            isDisabled={disableSave}
            onClick={onClickSave}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileRightPanelTechsUsed);
