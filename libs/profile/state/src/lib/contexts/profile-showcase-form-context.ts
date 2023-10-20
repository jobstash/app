import { ChangeEventHandler, createContext, useContext } from 'react';

export interface ProfileShowcaseFormContextProps {
  options: string[];
  currentShowcase: { label: string; url: string };
  showcaseLabelSet: Set<string>;
  displayForm: boolean;
  onChangeLabel: (_: string | null) => void;
  onCreateLabel: (_: string) => string;
  onChangeUrl: ChangeEventHandler<HTMLInputElement>;
  onClickAddItem: () => void;
  onClickAddAnother: () => void;
  errors: {
    label: string | null;
    url: string | null;
  };
  disabled: {
    urlInput: boolean;
    addItem: boolean;
  };
}

export const ProfileShowcaseFormContext =
  createContext<ProfileShowcaseFormContextProps | null>(null);

export const useProfileShowcaseFormContext = () => {
  const context = useContext(ProfileShowcaseFormContext);

  if (context === null) {
    throw new Error(
      'useProfileShowcaseFormContext must be used within a ProfileShowcaseFormContextProvider',
    );
  }

  return context;
};
