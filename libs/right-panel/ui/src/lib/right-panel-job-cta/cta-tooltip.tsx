import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Tooltip } from '@nextui-org/tooltip';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export const CTATooltip = ({
  children,
  content,
  defaultOpen = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      if (!isOpen && defaultOpen) setIsOpen(true);
      setInitialized(true);
    }
  }, [defaultOpen, initialized, isOpen]);

  const closeOnScroll = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  const handleScroll = useRef(() => {
    closeOnScroll();
  });

  useEffect(() => {
    const throttledHandleScroll = () => {
      handleScroll.current();
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return (
    <Tooltip
      showArrow
      classNames={{
        base: 'before:bg-darker-gray dark:before:bg-darker-gray bg-darker-gray',
        content: 'bg-darker-gray',
      }}
      placement="top-start"
      content={content}
      delay={0}
      closeDelay={0}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div>{children}</div>
    </Tooltip>
  );
};
