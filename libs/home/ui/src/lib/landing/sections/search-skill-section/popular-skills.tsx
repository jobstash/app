import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { HOME_PAGE_SKILL_COUNT } from '@jobstash/home/core';
import { FRONTEND_URL, lato, ROUTE_SECTION } from '@jobstash/shared/core';
import { capitalize, openNewTab } from '@jobstash/shared/utils';

import { usePopularSkills } from '@jobstash/shared/state';

import { BrowseSection } from '../browse-section';
import { LoadingSection } from '../loading-section';

export const PopularSkills = () => {
  const { data } = usePopularSkills(HOME_PAGE_SKILL_COUNT);

  if (!data) return <LoadingSection />;

  const skills = data.map((tag) => ({
    label: sanitizeSkill(tag.name),
    skill: tag.normalizedName,
  }));

  return (
    <>
      <div className='flex items-center  flex-wrap justify-around gap-y-2 md:justify-center md:gap-x-4'> 
        {skills.map(({ label, skill }) => (
          <Button
            key={skill}
            as={Link}
            href={`${FRONTEND_URL}${ROUTE_SECTION.JOBS}?tags=${skill}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="bordered"
            className=""
            onClick={() => openSkill(skill)}
          >
            <span
              className={`${lato.className} font-semibold`}
            >{`Remote ${label} Jobs in Crypto`}</span>
          </Button>
        ))}
      </div>
      <BrowseSection isLoadingSibling={!data} />
    </>
  );
};

const sanitizeSkill = (_skill: string) => {
  // Replace all non dash/underscore w/ space
  const skill = _skill.replaceAll(/[_-]/g, ' ');

  return skill.includes(' ')
    ? skill
        .split(' ')
        .map((o) => capitalize(o))
        .join(' ')
    : capitalize(skill);
};

const openSkill = (skill: string) =>
  openNewTab(`${FRONTEND_URL}${ROUTE_SECTION.JOBS}?tags=${skill}`);
