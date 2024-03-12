import { cn } from '~/shared/utils/cn';

import { getSkillColor } from './get-skill-color';
import { SkillWrapperIndicator } from './indicator';

interface Props {
  id: string;
  children: string;
  isChecked?: boolean;
  canTeach?: boolean;
}

export const SkillWrapper = ({ id, children, isChecked, canTeach }: Props) => {
  const color = getSkillColor(id);

  return (
    <div className="relative flex items-center justify-center">
      <SkillWrapperIndicator
        color={color}
        isChecked={isChecked}
        canTeach={canTeach}
      />
      <div
        className={cn(
          'flex items-center justify-center rounded-sm border p-1',
          `border-${color}`,
        )}
      >
        <span
          className={cn(
            'font-lato text-xs font-bold antialiased',
            `text-${color}`,
          )}
        >
          {children.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
