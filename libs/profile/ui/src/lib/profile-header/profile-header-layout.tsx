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
}: Props) => (
  <>
    {header}

    <div className="flex justify-between items-center gap-4">
      <div className="w-5/12">{preferredInput}</div>
      <div className="w-5/12">{selectedInput}</div>
      <div className="w-2/12" />
    </div>

    <div className="flex justify-between items-center gap-4">
      <div className="w-5/12">{countryInput}</div>
      <div className="w-5/12">{cityInput}</div>
      <div className="w-2/12">{saveButton}</div>
    </div>
  </>
);

export default ProfileHeaderLayout;
