import { type ReactNode } from 'react';

interface Props {
  labelInput: ReactNode;
  urlInput: ReactNode;
  iconButton: ReactNode;
}

const ShowcaseItemLayout = (props: Props) => {
  const { labelInput, urlInput, iconButton } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      <div className="flex-1">{labelInput}</div>
      <div className="flex-1">{urlInput}</div>
      <div>{iconButton}</div>
    </div>
  );
};

export default ShowcaseItemLayout;
