import React from 'react';

interface BartabProps {
  /**
   * How large should the button be?
   */
  // size?: 'Link' | 'Tab' | 'Profile';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  // onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Bartab = ({
  // size = 'Link',
  label,
  ...props
}: BartabProps) => {
  // const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button className='px-8 block py-2'
      type="button"
      // className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
