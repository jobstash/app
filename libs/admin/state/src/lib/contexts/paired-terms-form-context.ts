import { createContext, useContext } from 'react';

export interface PairedTermsFormContextProps {
  origin: string | null;
  initOrigin: string | null;
  onChangeOrigin: (_: string) => void;
  destination: string[];
  initDestination: string[];
  destinationOptions: string[];
  addDestination: (_: string) => void;
  removeDestination: (_: string) => void;
  isLoadingMutation: boolean;
  onSubmit: () => void;
}

export const PairedTermsFormContext =
  createContext<PairedTermsFormContextProps | null>(null);

export const usePairedTermsFormContext = () => {
  const context = useContext(PairedTermsFormContext);

  if (!context) {
    throw new Error(
      'usePairedTermsFormContext must be used within a PairedTermsFormContextProvider',
    );
  }

  return context;
};
