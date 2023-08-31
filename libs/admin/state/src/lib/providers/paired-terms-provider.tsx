import { type ReactNode } from 'react';

import { PairedTermsContext } from '../contexts/paired-terms-context';
import { usePairedTerms } from '../hooks/use-paired-terms';

interface Props {
  children: ReactNode;
}

export const PairedTermsProvider = ({ children }: Props) => {
  const value = usePairedTerms();

  return (
    <PairedTermsContext.Provider value={value}>
      <div className="flex flex-col gap-8 w-full justify-center items-center">
        {children}
      </div>
    </PairedTermsContext.Provider>
  );
};
