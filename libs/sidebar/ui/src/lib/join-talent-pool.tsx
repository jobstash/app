import { useAuthContext } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

export const JoinTalentPool = ({ isMobile }: Props) => {
  const { isAuthenticated, showLoginModal } = useAuthContext();

  if (isAuthenticated) return null;

  const onClick = () => {
    showLoginModal();
  };

  const textClassName = isMobile ? 'font-medium' : 'text-md whitespace-nowrap';

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Text className={textClassName}>Join Talent Pool</Text>
    </div>
  );
};
