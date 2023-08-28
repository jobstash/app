import { createContext, useContext } from 'react';

interface PairedTermsContextProps {
  isLoading: boolean;
}

export const PairedTermsContext = createContext<PairedTermsContextProps | null>(
  null,
);

export const usePairedTermsContext = () => {
  const context = useContext(PairedTermsContext);
  if (context === null) {
    throw new Error(
      'usePairedTermsContext must be used within a PairedTermsContextProvider',
    );
  }

  return context;
};
