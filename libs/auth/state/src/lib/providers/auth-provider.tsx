import { type ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { useAuthProvider } from '../hooks/use-auth-provider';

type Props = {
  children: ReactNode;
  screenLoader: ReactNode;
};

const AuthErrorPage = ({
  onRetry,
  error,
}: {
  onRetry: () => void;
  error: string | null;
}) => (
  <div className="flex h-screen items-center justify-center">
    <div className="flex flex-col items-center space-y-6 max-w-md text-center p-8">
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-white">
          Service Temporarily Unavailable
        </h1>
        <p className="text-gray-400">
          We&apos;re experiencing some issues. Please try later.
        </p>
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  </div>
);

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

  if (value.isApiUnavailable) {
    return (
      <AuthContext.Provider value={value}>
        <AuthErrorPage error={value.apiError} onRetry={value.retryAuth} />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {value.isLoading || !isReady ? screenLoader : children}
    </AuthContext.Provider>
  );
};
