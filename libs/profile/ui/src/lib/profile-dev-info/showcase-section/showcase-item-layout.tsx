import { type ReactNode } from 'react';

interface Props {
  labelInput: ReactNode;
  urlInput: ReactNode;
  iconButton: ReactNode;
}

const ShowcaseItemLayout = (props: Props) => {
  const { labelInput, urlInput, iconButton } = props;

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-grow w-1/3">{labelInput}</div>

      <div className="flex-grow">{urlInput}</div>

      <div className="flex items-center justify-center h-12 w-12">
        {iconButton}
      </div>
    </div>
  );
};

export default ShowcaseItemLayout;
