import { Radio, RadioProps } from '@nextui-org/radio';
import { Spinner } from '@nextui-org/spinner';

import { cn } from '@jobstash/shared/utils';

interface Props extends RadioProps {
  isLoading?: boolean;
}

export const CustomRadio = (props: Props) => {
  const { children, isLoading, disabled, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      disabled={disabled || isLoading}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-dark hover:bg-content2 items-center justify-between',
          'flex-row-reverse w-[320px] cursor-pointer rounded-lg gap-16 px-2 pr-4 py-4 border-2 border-transparent',
          'data-[selected=true]:border-secondary',
          { 'opacity-60': isLoading },
        ),
      }}
    >
      <div className="flex items-center gap-4">
        {children}
        <div className="min-w-[28px] min-h-[28px] flex items-center justify-center">
          {isLoading && <Spinner color="white" size="sm" />}
        </div>
      </div>
    </Radio>
  );
};
