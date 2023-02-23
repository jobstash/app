import { type ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

const cvaIconHolder = cva([''], {
  variants: {
    type: {},
  },
});

type IconHolderVariantProps = VariantProps<typeof cvaIconHolder>;

export interface IconHolderProps extends IconHolderVariantProps {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
  link?: string;
}

export const IconHolder = ({
  children,
  className,
  link,
  icon,
  ...props
}: IconHolderProps) => (
  <div className={`${cvaIconHolder()} ${className}`} {...props}>
    <div className="flex items-center">
      {/* Need to have a condition to check if link exists, print A tag otherwise do not */}
      <a href={link} className="flex items-center">
        <div className="relative mr-2 h-3 w-3 object-contain">{icon}</div>
        {children}
      </a>
    </div>
  </div>
);
