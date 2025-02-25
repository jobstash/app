import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Spinner } from "@heroui/spinner";
import { useAtomValue } from 'jotai';
import { SearchIcon, StarIcon } from 'lucide-react';

import { PERMISSIONS } from '@jobstash/auth/core';
import { Tag } from '@jobstash/shared/core';
import { cn, normalizeString } from '@jobstash/shared/utils';

import { useRoleClick } from '@jobstash/auth/state';
import {
  useProfileSkillTagAction,
  userSkillsAtom,
} from '@jobstash/profile/state';

import { TechWrapper } from '@jobstash/shared/ui';

interface Props {
  tag: Tag;
}

export const JobCardTechWrapper = ({ tag }: Props) => {
  const { id, name } = tag;
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onSearchTag = useCallback(() => {
    const url = new URL(window.location.href);
    const currentTags = url.searchParams.get('tags');
    const normalizedNewTag = normalizeString(name);

    const existingTags = currentTags
      ? currentTags.split(',').filter(Boolean)
      : [];

    if (!existingTags.includes(normalizedNewTag)) {
      existingTags.push(normalizedNewTag);
    }

    url.searchParams.set('tags', existingTags.join(','));
    router.push(url);
  }, [name, router]);

  const isTagApplied = useMemo(() => {
    const url = new URL(window.location.href);
    const currentTags = url.searchParams.get('tags');
    const normalizedName = normalizeString(name);

    return currentTags
      ? currentTags.split(',').includes(normalizedName)
      : false;
  }, [name]);

  const userSkills = useAtomValue(userSkillsAtom);
  const isInProfile = useMemo(() => {
    const normalizedName = normalizeString(name);

    return userSkills
      .map((skill) => normalizeString(skill.name))
      .includes(normalizedName);
  }, [name, userSkills]);

  const { isPending, mutate: addToProfile } = useProfileSkillTagAction();

  const onProfileSkillAction = () => {
    addToProfile({ userSkills, tag, isDelete: isInProfile });
  };

  const { roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback: onProfileSkillAction,
  });

  const filterItem = useMemo(() => {
    const description = isTagApplied
      ? `Already showing "${name}" jobs`
      : `Filter by "${name}"`;

    return {
      label: FILTER_ITEM_LABEL,
      description,
      startContent: <SearchIcon className="size-6" />,
      onClick: onSearchTag,
    };
  }, [isTagApplied, name, onSearchTag]);

  const skillItem = useMemo(() => {
    const label = isInProfile
      ? REMOVE_FROM_PROFILE_ITEM_LABEL
      : ADD_TO_PROFILE_ITEM_LABEL;

    const description = isInProfile
      ? 'Remove item from qualifications'
      : 'Showcase qualification';

    const startContent = isPending ? (
      <Spinner size="sm" color="white" />
    ) : (
      <StarIcon className="size-6" />
    );

    return {
      label,
      description,
      startContent,
      onClick: roleClick,
    };
  }, [isInProfile, isPending, roleClick]);

  const disabledKeys = useMemo(() => {
    const keys = new Set<string>();

    if (isPending) {
      keys.add(FILTER_ITEM_LABEL);
      keys.add(ADD_TO_PROFILE_ITEM_LABEL);
    }

    if (isTagApplied) {
      keys.add(FILTER_ITEM_LABEL);
    }

    if (isInProfile) {
      keys.add(ADD_TO_PROFILE_ITEM_LABEL);
    }

    return [...keys];
  }, [isInProfile, isPending, isTagApplied]);

  const canTeach = useMemo(() => {
    const skill = userSkills.find((skill) => skill.id === id);
    return skill?.canTeach ?? false;
  }, [id, userSkills]);

  return (
    <Dropdown showArrow radius="md" isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <div className="cursor-pointer" onClick={onClick}>
          <TechWrapper
            id={id}
            isChecked={isInProfile}
            isFilled={isTagApplied}
            canTeach={canTeach}
          >
            {name}
          </TechWrapper>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Tag actions"
        variant="faded"
        disabledKeys={disabledKeys}
      >
        <DropdownSection title="Tag Actions">
          {[filterItem, skillItem].map(
            ({ label, description, startContent, onClick }) => (
              <DropdownItem
                key={label}
                description={description}
                startContent={startContent}
                classNames={{
                  description: cn({
                    'text-purple-400': disabledKeys.includes(label),
                  }),
                }}
                onClick={onClick}
              >
                {label}
              </DropdownItem>
            ),
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

const FILTER_ITEM_LABEL = 'Search similar jobs';
const ADD_TO_PROFILE_ITEM_LABEL = 'Add to profile';
const REMOVE_FROM_PROFILE_ITEM_LABEL = 'Remove from profile';
