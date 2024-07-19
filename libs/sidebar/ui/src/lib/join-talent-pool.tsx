import { useEffect, useState } from 'react';

import { useIsMounted, useModal } from 'connectkit';
import { useSetAtom } from 'jotai';

import { bypassDevSignupAtom, useAuthContext } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

export const JoinTalentPool = ({ isMobile }: Props) => {
  const [canShow, setCanShow] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const timeout = setTimeout(() => setCanShow(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  if (!isMounted) return null;
  if (!canShow) return null;

  return <Content isMobile={isMobile} />;
};

const Content = ({ isMobile }: Props) => {
  const { setOpen } = useModal();
  const { isConnected, isSignedIn } = useAuthContext();
  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);

  const isAnon = !isConnected || !isSignedIn;

  if (!isAnon) return null;

  const onClick = () => {
    setBypassDevSignup(true);
    setOpen(true);
  };

  const textClassName = isMobile ? 'text-2xl' : 'text-md whitespace-nowrap';

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Text className={textClassName}>Join Talent Pool</Text>
    </div>
  );
};
