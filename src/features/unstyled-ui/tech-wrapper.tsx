import { type ButtonHTMLAttributes, MouseEventHandler, useState } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

import { Text } from './base/text';
import { AddIcon, CheckIcon } from './icons';

const cvaTechWrapper = cva([
  'border border-tech px-1.5 rounded-sm relative',
  'active:scale-[.95] transition duration-150 ease-in-out',
]);

type TechWrapperVariantProps = VariantProps<typeof cvaTechWrapper>;

interface TechWrapperProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    TechWrapperVariantProps {
  /** Tech text */
  text: string;

  /** Techs can either be */
  isChecked: boolean;
}

export const TechWrapper = ({
  text,
  isChecked,
  ...props
}: TechWrapperProps) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);
  const [isHovering, setIsHovering] = useState(false);

  const displayIndicator = isCheckedState || isHovering;

  // Just toggle is-match state for now
  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsCheckedState((prev) => !prev);
  };

  return (
    <button
      type="button"
      className={cvaTechWrapper()}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <Text className="text-tech">{text.toUpperCase()}</Text>
      {displayIndicator && (
        <div className="absolute -top-2 -right-3 h-5 w-5 items-center justify-center">
          <div className="relative">
            {isCheckedState && <CheckIcon />}
            {isHovering && !isCheckedState && <AddIcon />}
          </div>
        </div>
      )}
    </button>
  );
};
