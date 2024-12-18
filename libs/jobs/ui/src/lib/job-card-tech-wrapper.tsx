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
import { normalizeString } from '@jobstash/shared/utils';

import { useRoleClick } from '@jobstash/auth/state';
import { useAddTagToProfile, userSkillsAtom } from '@jobstash/profile/state';

import { TechWrapper } from '@jobstash/shared/ui';

const FILTER_JOBS_LABEL = 'Search similar jobs';
const ADD_TO_PROFILE_LABEL = 'Add to profile';

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
    const { searchParams } = url;
    searchParams.append('tags', normalizeString(name));
    router.push(url);
  }, [name, router]);

  const { isPending, mutate: addToProfile } = useAddTagToProfile();

  const onAddToProfile = () => {
    addToProfile(tag);
  };

  // TODO: check if skill is already in user profile
  const { hasPermission, roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback: onAddToProfile,
  });

  const userSkills = useAtomValue(userSkillsAtom);

  const dropdownItems: IDropdownItem[] = useMemo(() => {
    const normalizedName = normalizeString(name);
    const normalizedUserSkills = userSkills.map((skill) =>
      normalizeString(skill.name),
    );

    const canBeAdded =
      !hasPermission ||
      !userSkills
        .map((skill) => normalizeString(skill.name))
        .includes(normalizeString(name));

    console.log({ normalizedUserSkills, normalizedName, canBeAdded });

    const items = [
      {
        label: FILTER_JOBS_LABEL,
        description: `Filter by "${name}"`,
        startContent: <SearchIcon className="size-6" />,
        onClick: onSearchTag,
      },
    ];

    if (canBeAdded) {
      items.push({
        label: ADD_TO_PROFILE_LABEL,
        description: 'Showcase qualification',
        startContent: isPending ? (
          <Spinner size="sm" color="white" />
        ) : (
          <StarIcon className="size-6" />
        ),
        onClick: roleClick,
      });
    }

    return items;
  }, [hasPermission, isPending, name, onSearchTag, roleClick, userSkills]);

  const disabledKeys = isPending ? [ADD_TO_PROFILE_LABEL] : [];

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
          {dropdownItems.map(
            ({ label, description, startContent, onClick }) => (
              <DropdownItem
                key={label}
                description={description}
                startContent={startContent}
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

interface IDropdownItem {
  label: string;
  description: string;
  startContent: React.ReactNode;
  onClick: () => void;
}
