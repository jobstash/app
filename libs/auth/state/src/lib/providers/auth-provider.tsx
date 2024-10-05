import { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { useAuthProvider } from '../hooks/use-auth-provider';

type Props = {
  children: ReactNode;
  screenLoader: ReactNode;
};

export const AuthProvider = ({ children, screenLoader }: Props) => {
  const value = useAuthProvider();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {value.isLoading || !isReady ? screenLoader : children}
    </AuthContext.Provider>
  );
};
