import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Radio, RadioGroup, RadioProps } from '@nextui-org/radio';
import { Spinner } from '@nextui-org/react';

import { ATS_PROVIDERS, ATSPlatform } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { useATSClient } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const LEVER_OAUTH_URL = `${MW_URL}/scorer/oauth/lever`;

export const ActiveATS = () => {
  // TODO: Selected should default to None if GET endpoint is not yet set
  const router = useRouter();

  const { data, isPending: isPendingATSProvider } = useATSClient();

  const [selected, setSelected] = useState<ATSPlatform | string>(
    ATS_PROVIDERS.DEFAULT.platformName,
  );

  useEffect(() => {
    if (data) {
      setSelected(
        data.name ?? (ATS_PROVIDERS.DEFAULT.platformName as ATSPlatform),
      );
    }
  }, [data]);

  const [isLoadingManual, setIsLoadingManual] = useState(false);

  const onValueChange = async (value: string) => {
    if (value === ATS_PROVIDERS.DEFAULT.siteLabel) {
      // TODO: Disable Applicants Sidebar
      // TODO: Disable "other" forms
      return;
    }

    if (value === ATS_PROVIDERS.JOBSTASH.siteLabel) {
      // TODO: Enable Applicants Sidebar
      // TODO: Enable "other" forms
      return;
    }

    if (value === ATS_PROVIDERS.LEVER.siteLabel) {
      setIsLoadingManual(true);
      router.push(LEVER_OAUTH_URL);
    }
  };

  const isLoading = isPendingATSProvider || isLoadingManual;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <Heading size="sm">Select Active ATS:</Heading>
        {isLoading && <Spinner color="white" size="sm" />}
      </div>

      <div className="pl-4">
        <RadioGroup
          defaultValue="jobstash"
          orientation="horizontal"
          classNames={{ wrapper: 'gap-4' }}
          value={selected}
          isDisabled={
            isLoading || selected !== ATS_PROVIDERS.DEFAULT.platformName
          }
          onValueChange={onValueChange}
        >
          <CustomRadio
            description={ATS_PROVIDERS.DEFAULT.siteLabel}
            value={ATS_PROVIDERS.DEFAULT.platformName}
          >
            {ATS_PROVIDERS.DEFAULT.label}
          </CustomRadio>
          <CustomRadio
            description={ATS_PROVIDERS.JOBSTASH.siteLabel}
            value={ATS_PROVIDERS.JOBSTASH.platformName}
          >
            {ATS_PROVIDERS.JOBSTASH.label}
          </CustomRadio>
          <CustomRadio
            description={ATS_PROVIDERS.GREENHOUSE.siteLabel}
            value={ATS_PROVIDERS.GREENHOUSE.platformName}
          >
            {ATS_PROVIDERS.GREENHOUSE.label}
          </CustomRadio>
          <CustomRadio
            description={ATS_PROVIDERS.LEVER.siteLabel}
            value={ATS_PROVIDERS.LEVER.platformName}
          >
            {ATS_PROVIDERS.LEVER.label}
          </CustomRadio>
          <CustomRadio
            description={ATS_PROVIDERS.WORKABLE.siteLabel}
            value={ATS_PROVIDERS.WORKABLE.platformName}
          >
            {ATS_PROVIDERS.WORKABLE.label}
          </CustomRadio>
        </RadioGroup>
      </div>
    </div>
  );
};

interface CustomRadioProps extends RadioProps {
  isLoading?: boolean;
}

export const CustomRadio = (props: CustomRadioProps) => {
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
