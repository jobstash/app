import { useTagsUsedContext } from '@jobstash/profile/state';

import ProfileRepoTag from '../profile-repo-tag';

const TagList = () => {
  const { currentTags, onTagRemove, onClickCanTeach } = useTagsUsedContext();

  return (
    <div className="flex flex-wrap gap-4 items-center pt-2">
      {currentTags.map(({ id, name, canTeach }) => (
        <ProfileRepoTag
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
