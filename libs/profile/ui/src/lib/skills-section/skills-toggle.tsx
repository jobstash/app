import { useProfileSkillsContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const SkillsToggle = () => {
  const { isLoading, skills, isEditing, toggleEdit } =
    useProfileSkillsContext();

  const hasSkills = skills.length > 0;
  const showBorder = hasSkills || isLoading.query || isEditing;
  const buttonText = isEditing
    ? 'Hide Details'
    : `${hasSkills ? 'Edit' : 'Add'} Skills`;

  const isDisabled = isLoading.query || isLoading.mutation;

  return (
    <>
      {showBorder && <hr className="border-t border-white/10" />}
      <div>
        <Button
          variant="outline"
          size="sm"
          isDisabled={isDisabled}
          onClick={() => toggleEdit()}
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default SkillsToggle;
