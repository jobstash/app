import { Select } from '@mantine/core';

import { ORG_REVIEW_WORKING_HOURS } from '@jobstash/organizations/core';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const WorkingHoursSelect = () => {
  const {
    review: { workingHours },
    setWorkingHours,
  } = useProfileOrgReviewFormContext();

  const onChangeStart = (start: string | null) =>
    setWorkingHours({ ...workingHours, start });

  const onChangeEnd = (end: string | null) =>
    setWorkingHours({ ...workingHours, end });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading size="md" fw="semibold">
          Working Hours
        </Heading>

        <Text color="dimmed">
          In your own timezone, what are your regular working hours?
        </Text>
      </div>
      <div className="w-full flex items-center gap-4">
        <SelectHour value={workingHours.start} onChange={onChangeStart} />
        <SelectHour value={workingHours.end} onChange={onChangeEnd} />
      </div>
    </div>
  );
};

export default WorkingHoursSelect;

interface SelectHourProps {
  value: string | null;
  onChange: (_: string | null) => void;
}

const SelectHour = ({ value, onChange }: SelectHourProps) => (
  <Select
    withinPortal
    allowDeselect
    placeholder="Select Location"
    size="lg"
    data={ORG_REVIEW_WORKING_HOURS}
    classNames={{
      root: 'w-full',
      input:
        'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
      itemsWrapper: 'bg-dark',
      item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
    }}
    value={value}
    onChange={onChange}
  />
);
