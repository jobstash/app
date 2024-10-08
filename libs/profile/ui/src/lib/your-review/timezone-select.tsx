import { forwardRef } from 'react';

import { Select, SelectItemProps } from '@mantine/core';

import { ORG_REVIEW_TIMEZONES } from '@jobstash/organizations/core';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const TimezoneSelect = () => {
  const {
    review: { timezone },
    setTimezone,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading size="md" fw="semibold">
          Effective Timezone
        </Heading>

        <Text color="dimmed">
          Which timezone were you aligning with? Was it fully async, on your
          own, or were you aligning with other colleagues in a specific region?
        </Text>
      </div>
      <div className="w-full">
        <Select
          withinPortal
          allowDeselect
          size="lg"
          placeholder="Select Timezone"
          data={ORG_REVIEW_TIMEZONES}
          classNames={{
            input:
              'rounded-lg bg-dark-gray text-md placeholder:text-white/50 placeholder:text-md focus:border-white/40',
            itemsWrapper: 'bg-dark',
            item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          }}
          value={timezone}
          onChange={setTimezone}
        />
      </div>
    </div>
  );
};

export default TimezoneSelect;

const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, ...others }, ref) => (
    <div ref={ref} {...others}>
      <p>{value}</p>
    </div>
  ),
);
Item.displayName = 'Item';
