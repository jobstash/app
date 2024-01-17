import { type ReactNode } from 'react';

interface Props {
  labelInput: ReactNode;
  urlInput: ReactNode;
  iconButton: ReactNode;
}

const ShowcaseItemLayout = (props: Props) => {
  const { labelInput, urlInput, iconButton } = props;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 md:flex-grow md:flex-none md:max-w-[40%]">
        {labelInput}
      </div>

      <div className="flex-1 md:flex-grow md:flex-none flex gap-2 items-center">
        <div className="w-full">{urlInput}</div>
        <div className="flex items-center justify-center h-12 w-12">
          {iconButton}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseItemLayout;
