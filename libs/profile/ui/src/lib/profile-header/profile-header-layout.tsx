import { type ReactNode } from 'react';

interface Props {
  header: ReactNode;
  preferredInput: ReactNode;
  selectedInput: ReactNode;
  saveButton: ReactNode;
}

const ProfileHeaderLayout = ({
  header,
  preferredInput,
  selectedInput,
  saveButton,
}: Props) => (
  <>
    {header}

    <div className="flex justify-between items-center gap-8">
      <div className="flex gap-4 grow">
        <div className="w-1/2">{preferredInput}</div>
        <div className="w-1/2">{selectedInput}</div>
      </div>
      <div>{saveButton}</div>
    </div>
  </>
);

export default ProfileHeaderLayout;
