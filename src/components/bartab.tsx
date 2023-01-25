import React, { ReactNode } from 'react';

export interface BartabProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'link' | 'tab' | 'profile';
  leftSection: ReactNode;
  onClick?: React.MouseEventHandler;
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
