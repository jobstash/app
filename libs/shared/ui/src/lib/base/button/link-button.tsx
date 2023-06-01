import Link, { type LinkProps } from 'next/link';
import { memo } from 'react';

import { cn } from '@jobstash/shared/utils';

import Text from '../text';

import { ButtonProps, buttonVariants } from './button';
import ButtonWrapper from './button-wrapper';

interface LinkButtonProps extends ButtonProps {
  linkProps: LinkProps;
}

const LinkButton = ({
  children,
  size = 'md',
  isActive,
  isDisabled,
  variant = 'default',
  left,
  right,
  isFullWidth,
  isBordered,
  textProps,
  linkProps,
  ...props
}: LinkButtonProps) => (
  <ButtonWrapper
    variant={variant}
    isActive={isActive}
    isDisabled={isDisabled}
    isFullWidth={isFullWidth}
    isBordered={isBordered}
  >
    <Link
      {...linkProps}
      className={cn(
        buttonVariants({
          variant,
          size,
          isActive,
          isDisabled,
          hasLeft: Boolean(left),
          hasRight: Boolean(right),
          isFullWidth,
          isBordered,
        }),
      )}
    >
      {left ?? null}
      <Text size={size} {...textProps}>
        {children as string}
      </Text>
      {right ?? null}
    </Link>
  </ButtonWrapper>
);

export default memo(LinkButton);
