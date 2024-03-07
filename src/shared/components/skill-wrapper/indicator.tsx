import { cn } from '~/shared/utils/cn';

import { CanTeachIcon } from './can-teach-icon';
import { CheckIcon } from './check-icon';

interface Props {
  color: string;
  isChecked?: boolean;
  canTeach?: boolean;
}

export const SkillWrapperIndicator = ({
  color,
  isChecked,
  canTeach,
}: Props) => {
  const icon = isChecked ? <CheckIcon /> : canTeach ? <CanTeachIcon /> : null;

  if (!icon) return null;

  return (
    <>
      <div
        className={cn(
          'absolute right-0 top-0 -mr-2.5 -mt-2.5 h-5 w-5 rounded-full',
          `bg-${color}`,
        )}
      />
      <div className="absolute right-0 top-0 -mr-2 mt-[-7px]">{icon}</div>
    </>
  );
};
