import {
  useProfileDevInfoContext,
  useProfileSkillsContext,
} from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const SkillsToggle = () => {
  const { isLoading } = useProfileDevInfoContext();
  const { hasSkills, isEditing, toggleEdit } = useProfileSkillsContext();

  const showBorder = hasSkills || isLoading.skillsQuery || isEditing;
  const buttonText = isEditing
    ? 'Hide Details'
    : `${hasSkills ? 'Edit Your' : 'Add'} Skills`;

  return (
    <>
      {showBorder && <hr className="border-t border-white/10" />}
      {isLoading.skillsQuery ? (
        <div className="h-9 bg-white/20 rounded-lg w-24 animate-pulse" />
      ) : (
        <Button variant="outline" size="sm" onClick={() => toggleEdit()}>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default SkillsToggle;
