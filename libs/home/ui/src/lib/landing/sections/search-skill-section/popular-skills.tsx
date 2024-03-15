import { useRouter } from 'next/router';

import { Button } from '@nextui-org/button';
import { useQuery } from '@tanstack/react-query';

import { lato, ROUTE_SECTION } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { getPopularSkills } from '@jobstash/home/data';

import { LoadingSection } from '../loading-section';

export const PopularSkills = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['popular-skills', SKILL_COUNT],
    queryFn: () => getPopularSkills(SKILL_COUNT),
    staleTime: 1000 * 60 * 60, // 1hr
  });

  if (!data) return <LoadingSection />;

  const openSkill = (skill: string) =>
    router.push(`${ROUTE_SECTION.JOBS}?skills=${skill}`);

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
        .map((o) => capitalize(o, true))
        .join(' ')
    : capitalize(skill, true);
};
