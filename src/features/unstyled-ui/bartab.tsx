import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { Text } from './base/text';
import { RightCaretIcon } from './icons';

const cvaBartab = cva(
  ['bg-white/5 h-10 px-4 rounded-md flex justify-between w-full items-center'],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-secondary',
      },
    },
  },
);

// Cva type alias
type BartabVariantProps = VariantProps<typeof cvaBartab>;

interface BartabProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BartabVariantProps {
  /** Text inside bartab */
  text: string;

  /** Left Element */
  left?: ReactNode;

  /** If section is current active */
  isActive?: boolean;

  /** Click handler */
  onClick: MouseEventHandler;
}

export const Bartab = ({
  text,
  left,
  isActive,
  onClick,
  ...props
}: BartabProps) => (
  <button
    type="button"
    className={cvaBartab({ isActive })}
    {...props}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      {left}
      <Text size="sm" fw="semibold">
        {text}
      </Text>
    </div>
    <RightCaretIcon />
  </button>
);
