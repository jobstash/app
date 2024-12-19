import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Spinner } from '@nextui-org/spinner';
import { useAtomValue } from 'jotai';
import { SearchIcon, StarIcon } from 'lucide-react';

import { PERMISSIONS } from '@jobstash/auth/core';
import { Tag } from '@jobstash/shared/core';
import { cn, normalizeString } from '@jobstash/shared/utils';

import { useRoleClick } from '@jobstash/auth/state';
import { useAddTagToProfile, userSkillsAtom } from '@jobstash/profile/state';

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

  const { isPending, mutate: addToProfile } = useAddTagToProfile();

  const onAddToProfile = () => {
    addToProfile(tag);
  };

  const { roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback: onAddToProfile,
  });

  const userSkills = useAtomValue(userSkillsAtom);

  const isTagApplied = useMemo(() => {
    const url = new URL(window.location.href);
    const currentTags = url.searchParams.get('tags');
    const normalizedName = normalizeString(name);

    return currentTags
      ? currentTags.split(',').includes(normalizedName)
      : false;
  }, [name]);

  const filterItem = useMemo(() => {
    const label = isTagApplied ? FILTER_ITEM_LABEL : FILTER_ITEM_LABEL;

    const description = isTagApplied
      ? `Already showing "${name}" jobs`
      : `Filter by "${name}"`;

    const startContent = <SearchIcon className="size-6" />;

    return {
      label,
      description,
      startContent,
      onClick: onSearchTag,
    };
  }, [isTagApplied, name, onSearchTag]);

  const isInProfile = useMemo(() => {
    const normalizedName = normalizeString(name);

    return userSkills
      .map((skill) => normalizeString(skill.name))
      .includes(normalizedName);
  }, [name, userSkills]);

  const skillItem = useMemo(() => {
    const label = isInProfile ? PROFILE_ITEM_LABEL : PROFILE_ITEM_LABEL;

    const description = isInProfile
      ? 'Already in your qualifications'
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
      keys.add(PROFILE_ITEM_LABEL);
    }

    if (isTagApplied) {
      keys.add(FILTER_ITEM_LABEL);
    }

    if (isInProfile) {
      keys.add(PROFILE_ITEM_LABEL);
    }

    return [...keys];
  }, [isInProfile, isPending, isTagApplied]);

  return (
    <Dropdown showArrow radius="md" isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <div className="cursor-pointer" onClick={onClick}>
          <TechWrapper id={id}>{name}</TechWrapper>
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
const PROFILE_ITEM_LABEL = 'Add to profile';
