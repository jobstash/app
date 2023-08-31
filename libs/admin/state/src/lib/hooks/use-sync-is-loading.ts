import { useEffect } from 'react';

interface Params {
  asyncIsLoading: boolean;
  isLoading: boolean;
  setIsLoading: (_: boolean) => void;
}

export const useSyncIsLoading = ({
  asyncIsLoading,
  isLoading,
  setIsLoading,
}: Params) => {
  useEffect(() => {
    if (asyncIsLoading !== isLoading) {
      setIsLoading(isLoading);
    }
  }, [asyncIsLoading, isLoading, setIsLoading]);
};
