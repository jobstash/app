import { useSkillsUsedContext } from '@jobstash/profile/state';

import ProfileRepoSkill from '../profile-repo-skill';

const TagList = () => {
  const { tagsUsed, onTagRemove, onClickCanTeach } = useSkillsUsedContext();

  return (
    <div className="flex flex-wrap gap-4 items-center pt-2">
      {tagsUsed.map(({ id, name, canTeach }) => (
        <ProfileRepoSkill
          key={id}
          id={id}
          name={name}
          canTeach={canTeach}
          onTagRemove={onTagRemove}
          onClickCanTeach={onClickCanTeach}
        />
      ))}
    </div>
  );
};

export default TagList;
