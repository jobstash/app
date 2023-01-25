import React, { ReactNode } from 'react';

export interface BartabProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: 'link' | 'tab' | 'profile';
  leftSection: ReactNode;
  // eslint-disable-next-line no-undef
  onClick: VoidFunction;
}

export const Bartab = ({ children, leftSection, ...props }: BartabProps) => {
  const classNames = `bg-black text-white`;

  return (
    <button className={classNames} {...props}>
      {leftSection}
      {children}
    </button>
  );
};
