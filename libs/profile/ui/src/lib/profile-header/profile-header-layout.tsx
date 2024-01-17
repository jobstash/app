import { type ReactNode } from 'react';

interface Props {
  header: ReactNode;
  preferredInput: ReactNode;
  selectedInput: ReactNode;
  countryInput: ReactNode;
  cityInput: ReactNode;
  saveButton: ReactNode;
}

const ProfileHeaderLayout = ({
  header,
  preferredInput,
  selectedInput,
  saveButton,
  countryInput,
  cityInput,
}: Props) => {
  const inputWrapperClassName = 'flex flex-col md:flex-row gap-6 [&>*]:flex-1';

  return (
    <>
      {header}

      <div className={inputWrapperClassName}>
        {preferredInput}
        {selectedInput}
      </div>

      <div className={inputWrapperClassName}>
        {countryInput}
        {cityInput}
      </div>

      {saveButton}
    </>
  );
};

export default ProfileHeaderLayout;
