import { useTechsUsedContext } from '@jobstash/profile/state';

import ProfileRepoTech from '../profile-repo-tech';

const TechsUsedList = () => {
  const { currentTechs, onTechRemove, onClickCanTeach } = useTechsUsedContext();

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {currentTechs.map(({ id, name, canTeach }) => (
        <ProfileRepoTech
          key={id}
          id={id}
          name={name}
          canTeach={canTeach}
          onTechRemove={onTechRemove}
          onClickCanTeach={onClickCanTeach}
        />
      ))}
    </div>
  );
};

export default TechsUsedList;
