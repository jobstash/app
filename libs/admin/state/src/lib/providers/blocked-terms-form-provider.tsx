import { type ReactNode } from 'react';

import { BlockedTermsFormContext } from '../contexts/blocked-terms-form-context';
import { useBlockedTermsForm } from '../hooks/use-blocked-terms-form';

interface Props {
  children: ReactNode;
}

export const BlockedTermsFormProvider = ({ children }: Props) => {
  const value = useBlockedTermsForm();

  return (
    <BlockedTermsFormContext.Provider value={value}>
      {children}
    </BlockedTermsFormContext.Provider>
  );
};
