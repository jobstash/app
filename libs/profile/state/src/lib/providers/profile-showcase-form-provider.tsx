import { type ReactNode } from 'react';

import { ProfileShowcaseFormContext } from '../contexts/profile-showcase-form-context';
import { useProfileShowcaseForm } from '../hooks/use-profile-showcase-form';

interface Props {
  children: ReactNode;
}

export const ProfileShowcaseFormProvider = ({ children }: Props) => {
  const value = useProfileShowcaseForm();

  return (
    <ProfileShowcaseFormContext.Provider value={value}>
      {children}
    </ProfileShowcaseFormContext.Provider>
  );
};
