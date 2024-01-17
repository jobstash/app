import { forwardRef } from 'react';

import { cn } from '@jobstash/shared/utils';

import { useProfileSkillsContext } from '@jobstash/profile/state';

import ProfileRepoSkill from '../profile-repo-skill';

import SkillsInput from './skills-input';

const SkillsEdit = forwardRef<HTMLDivElement>((_props, ref) => {
  const { isEditing, skills, removeSkill, updateCanTeach, isLoading } =
    useProfileSkillsContext();

  if (!isEditing) return null;

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div>
        <hr className="border-t border-white/10" />
      </div>

      <div
        className={cn('flex flex-col gap-4 w-full', {
          'opacity-40 pointer-events-none':
            isLoading.query || isLoading.mutation,
        })}
      >
        <SkillsInput />
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center">
            {skills.map(({ id, name, canTeach }) => (
              <ProfileRepoSkill
                key={id}
                id={id}
                name={name}
                canTeach={canTeach}
                onTagRemove={(id) => removeSkill(id)}
                onClickCanTeach={updateCanTeach}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
SkillsEdit.displayName = 'SkillsEdit';

export default SkillsEdit;
