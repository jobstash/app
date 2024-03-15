import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';

import { FRONTEND_URL, lato, ROUTE_SECTION } from '@jobstash/shared/core';
import { capitalize, openNewTab } from '@jobstash/shared/utils';

import { getPopularSkills } from '@jobstash/home/data';

import { LoadingSection } from '../loading-section';

export const PopularSkills = () => {
  const { data } = useQuery({
    queryKey: ['popular-skills', SKILL_COUNT],
    queryFn: () => getPopularSkills(SKILL_COUNT),
    staleTime: 1000 * 60 * 60, // 1hr
  });

  if (!data) return <LoadingSection />;

  const skills = data.map((tag) => ({
    label: sanitizeSkill(tag.name),
    skill: tag.normalizedName,
  }));

  return (
    <div className="flex flex-wrap gap-4 justify-center py-4 pb-8">
      {skills.map(({ label, skill }) => (
        <Button key={skill} variant="bordered" onClick={() => openSkill(skill)}>
          <p className={`${lato.className} font-semibold`}>{label}</p>
        </Button>
      ))}
    </div>
  );
};

const SKILL_COUNT = 30;

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
  openNewTab(`${FRONTEND_URL}${ROUTE_SECTION.JOBS}?skills=${skill}`);
