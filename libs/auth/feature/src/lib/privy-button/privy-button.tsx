import { Button, useDisclosure } from '@nextui-org/react';
import { usePrivy } from '@privy-io/react-auth';

import { cn } from '@jobstash/shared/utils';

import { ActiveModal } from './active-modal';
import { usePrivyName } from './use-privy-name';

const wrapperStyle = {
  background:
    'linear-gradient(0deg, #1E1E1E, #1E1E1E) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
  border: '2px solid transparent',
};

export const PrivyButton = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { authenticated, login } = usePrivy();

  const name = usePrivyName();

  const text = authenticated ? name : 'Login';
  const onClick = authenticated ? onOpen : login;

  return (
    <>
      <div className={cn('h-10 w-44 rounded-lg')} style={wrapperStyle}>
        <Button
          fullWidth
          radius="sm"
          className="font-bold h-full bg-transparent"
          onClick={onClick}
        >
          {text}
        </Button>
      </div>
      <ActiveModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
