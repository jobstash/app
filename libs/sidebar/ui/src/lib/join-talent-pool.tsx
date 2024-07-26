import { useSetAtom } from 'jotai';

import { bypassDevSignupAtom, useAuthContext } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

export const JoinTalentPool = ({ isMobile }: Props) => {
  const { isAuthenticated, showLoginModal } = useAuthContext();
  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);

  if (isAuthenticated) return null;

  const onClick = () => {
    setBypassDevSignup(true);
    showLoginModal();
  };

  const textClassName = isMobile ? 'text-2xl' : 'text-md whitespace-nowrap';

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Text className={textClassName}>Join Talent Pool</Text>
    </div>
  );
};
