import { type ReactNode } from 'react';

import { PreferredTermsFormContext } from '../contexts/preferred-terms-form-context';
import { usePreferredTermsForm } from '../hooks/use-preferred-terms-form';

interface Props {
  initPrimaryTerm?: string;
  initSynonyms?: string[];
  children: ReactNode;
}

export const PreferredTermsFormProvider = (props: Props) => {
  const { initPrimaryTerm = '', initSynonyms = [], children } = props;

  const value = usePreferredTermsForm(initPrimaryTerm, initSynonyms ?? []);

  return (
    <PreferredTermsFormContext.Provider value={value}>
      {children}
    </PreferredTermsFormContext.Provider>
  );
};
