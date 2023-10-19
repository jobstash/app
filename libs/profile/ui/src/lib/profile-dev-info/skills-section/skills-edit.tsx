import { useProfileSkillsContext } from '@jobstash/profile/state';

import ProfileRepoTech from '../../profile-repo-tech';

import SkillsInput from './skills-input';

const SkillsEdit = () => {
  const { isEditing, skills, removeSkill } = useProfileSkillsContext();

  if (!isEditing) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-4">
        <div className="max-w-lg">
          <SkillsInput />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {skills.map(({ id, name, canTeach }) => (
            <ProfileRepoTech
              key={id}
              id={id}
              name={name}
              canTeach={canTeach}
              onTechRemove={(id) => removeSkill(id)}
              onClickCanTeach={() => null}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsEdit;
