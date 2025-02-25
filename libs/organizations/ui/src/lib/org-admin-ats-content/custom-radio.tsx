import { useState } from 'react';

import { Link } from '@heroui/link';
import { RadioProps, useRadio } from '@heroui/radio';
import { VisuallyHidden } from '@heroui/react';

import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props extends RadioProps {
  isDisabled?: boolean;
  infoUrl: string | null;
  setupGuideUrl: string | null;
}

export const CustomRadio = (props: Props) => {
  const { isDisabled, infoUrl, setupGuideUrl, disabled, ...otherProps } = props;
  const hasLink = Boolean(infoUrl) || Boolean(setupGuideUrl);

  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(otherProps);

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="flex flex-col gap-1"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Component
        {...getBaseProps()}
        disabled={disabled || isDisabled}
        className={cn(
          'group inline-flex m-0 bg-dark hover:bg-content2 items-center justify-between flex-row-reverse',
          'w-[220px] cursor-pointer rounded-lg gap-16 px-2 pr-4 py-4 border-2 border-transparent',
          'data-[selected=true]:border-secondary',
          { 'opacity-60 pointer-events-none': isDisabled },
        )}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
        <div {...getLabelWrapperProps()}>
          {children && <span {...getLabelProps()}>{children}</span>}
          {description && (
            <span className="text-sm text-white/50">{description}</span>
          )}
        </div>
      </Component>
      <div className="flex px-1 items-center h-6 gap-1">
        {((hovering && hasLink) || isSelected) && (
          <>
            {typeof infoUrl === 'string' && (
              <Link
                href={infoUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="text-white/40 text-sm"
                underline="hover"
              >
                What&apos;s this?
              </Link>
            )}

            {Boolean(infoUrl) && Boolean(setupGuideUrl) && (
              <Text className="text-white/40 text-sm">|</Text>
            )}

            {typeof setupGuideUrl === 'string' && (
              <Link
                href={setupGuideUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="text-white/40 text-sm"
                underline="hover"
              >
                Setup Guide
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
