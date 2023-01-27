import clsx from 'clsx';

import type { Skill } from '~/core/interfaces';

interface Props {
  skills: Skill[];
}

export const JobListingSkills = ({ skills }: Props) => (
  <>
    <div className="flex space-x-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className={clsx('border border-zinc-500 py-2 px-4', {
            'border-red-700': skill.isChecked,
          })}
        >
          <h3 className="text-xs">{skill.name}</h3>
        </div>
      ))}
    </div>

    <hr className="h-px border-0 bg-neutral-600" />
  </>
);
