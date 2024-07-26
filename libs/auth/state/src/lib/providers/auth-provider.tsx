import { type ReactNode } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { useAuthProvider } from '../hooks/use-auth-provider';

type Props = {
  children: ReactNode;
  screenLoader: ReactNode;
};

export const AuthProvider = ({ children, screenLoader }: Props) => {
  const value = useAuthProvider();

  // TODO: Redirect to the correct page based on the flow
  // Note: Consider users who login based on auth click

  return (
    <AuthContext.Provider value={value}>
      {value.isLoading ? screenLoader : children}
    </AuthContext.Provider>
  );
};
