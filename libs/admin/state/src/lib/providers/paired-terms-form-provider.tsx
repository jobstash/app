import { type ReactNode } from 'react';

import { PairedTermsFormContext } from '../contexts/paired-terms-form-context';
import { usePairedTermForm } from '../hooks/use-paired-term-form';

interface Props {
  initOrigin: string | null;
  initDestination: string[];
  children: ReactNode;
}

export const PairedTermsFormProvider = ({
  initOrigin,
  initDestination,
  children,
}: Props) => {
  const value = usePairedTermForm(initOrigin, initDestination);

  return (
    <PairedTermsFormContext.Provider value={value}>
      {children}
    </PairedTermsFormContext.Provider>
  );
};
