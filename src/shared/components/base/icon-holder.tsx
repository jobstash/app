import { type ReactNode } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { TagIconFilename } from '~/shared/core/types';

import { TagIcon } from '../icons';

const cvaIconHolder = cva([''], {
  variants: {
    type: {},
  },
});

type IconHolderVariantProps = VariantProps<typeof cvaIconHolder>;

export interface IconHolderProps extends IconHolderVariantProps {
  children: ReactNode;
  iconText?: TagIconFilename;
  className?: string;
  link?: string;
}

export const IconHolder = ({
  children,
  className,
  link,
  iconText,
  ...props
}: IconHolderProps) => {
  // Content shows an icon (if defined) and the text
  const content = (
    <>
      {iconText && <TagIcon filename={iconText} />}
      {children}
    </>
  );

  return (
    <div className={`${cvaIconHolder()} ${className}`} {...props}>
      {/** Note: If it has link, it should appear clickable */}
      <div className="flex items-center">
        {link ? (
          <a href={link} className="flex items-center">
            {content}
            <div className="ml-1">
              <TagIcon filename="external-link" />
            </div>
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
};
