import { Radio, RadioGroup, RadioProps } from '@nextui-org/radio';

import { cn } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

export const ActiveATS = () => (
  <div className="flex flex-col gap-4 w-full">
    <Heading size="sm">Select Active ATS:</Heading>
    <div className="pl-4">
      <RadioGroup
        defaultValue="jobstash"
        orientation="horizontal"
        classNames={{ wrapper: 'gap-4' }}
      >
        <CustomRadio description="jobstash.xyz" value="jobstash">
          Jobstash
        </CustomRadio>
        <CustomRadio description="greenhouse.com" value="greenhouse">
          Greenhouse
        </CustomRadio>
        <CustomRadio description="lever.co" value="lever">
          Lever
        </CustomRadio>
        <CustomRadio description="workable.com" value="workable">
          Workable
        </CustomRadio>
      </RadioGroup>
    </div>
  </div>
);

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-dark hover:bg-content2 items-center justify-between',
          'flex-row-reverse w-[320px] cursor-pointer rounded-lg gap-16 px-2 pr-4 py-4 border-2 border-transparent',
          'data-[selected=true]:border-secondary',
        ),
      }}
    >
      {children}
    </Radio>
  );
};
