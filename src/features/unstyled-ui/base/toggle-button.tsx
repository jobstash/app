import { type MouseEventHandler, type ReactNode, useReducer } from 'react';

import { type ButtonProps, Button } from './button';

interface Props {
  /** Default child element */
  children: ReactNode;

  /** Element shown when active state is toggled */
  activeEl: ReactNode;

  /** Props to pass on button element */
  buttonProps?: ButtonProps;
}

/**
 * This base component displays different children based on toggled state
 */
export const ToggleButton = ({ activeEl, buttonProps, children }: Props) => {
  const [isActive, toggle] = useReducer((prev) => !prev, false);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    // Call button-props onclick incase declared
    if (buttonProps?.onClick) buttonProps.onClick(e);

    // Toggle button state
    toggle();
  };

  return (
    <Button {...buttonProps} onClick={onClick}>
      {isActive ? activeEl : children}
    </Button>
  );
};
