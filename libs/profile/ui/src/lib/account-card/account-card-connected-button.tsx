import { ReactNode } from 'react';

import { Button, LinkButton, Text } from '@jobstash/shared/ui';

interface Props {
  label: string;
  isDisabled: boolean;
  href: string | null;
  children: ReactNode;
}

const AccountCardConnectedButton = ({
  label,
  isDisabled,
  href,
  children,
}: Props) => (
  <>
    <div className="text-center">
      <Text size="sm" color="dimmed">
        {label}
      </Text>
    </div>

    {href ? (
      <LinkButton
        isFullWidth
        external
        isDisabled={isDisabled}
        variant="primary"
        className="justify-center"
        linkProps={{
          href,
        }}
      >
        <div className="flex items-center gap-3">{children}</div>
      </LinkButton>
    ) : (
      <Button isFullWidth variant="primary" className="justify-center">
        <div className="flex items-center gap-3">{children}</div>
      </Button>
    )}
  </>
);

export default AccountCardConnectedButton;
