import { Dispatch, ReactNode, SetStateAction } from 'react';

import { FileButton } from '@mantine/core';

interface Props {
  setFile: Dispatch<SetStateAction<File | null>>;
  children: ReactNode;
}

export const ImageUploadContainer = ({ setFile, children }: Props) => (
  <FileButton
    accept="image/png,image/jpeg,image/jpg,image/gif,image/png,image/svg"
    onChange={setFile}
  >
    {(props) => (
      <div {...props} className="hover:cursor-pointer">
        {children}
      </div>
    )}
  </FileButton>
);
