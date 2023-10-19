import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const SkillsToggle = () => {
  const { isLoading, hasSkills, isEditing, toggleEdit } =
    useProfileSkillsContext();

  const showBorder = hasSkills || isLoading;
  const buttonText = isEditing
    ? 'Hide Edit'
    : `${hasSkills ? 'Edit Your' : 'Add'} Skills`;

  return (
    <>
      {showBorder && <hr className="border-t border-white/10" />}
      {isLoading ? (
        <div className="h-9 bg-white/20 rounded-lg w-24 animate-pulse" />
      ) : (
        <Button variant="primary" onClick={() => toggleEdit()}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default SkillsToggle;
