import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { Text } from './base/text';
import { RightCaretIcon } from './icons';

const cvaBartab = cva(
  ['h-10 px-4 rounded-lg flex justify-between w-full items-center hover:bg-white/10 active:bg-white/20 focus:border focus:border-white'],
  {
    variants: {
      intent: {
        secondary: ["bg-white/5"],
      },
      isActive: {
        true: 'bg-gradient-to-l from-primary to-secondary',
      }
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
  intent,
  onClick,
  ...props
}: BartabProps) => (
  <button
    type="button"
    className={cvaBartab({ intent, isActive })}
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
