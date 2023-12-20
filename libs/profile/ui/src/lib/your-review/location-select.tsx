import { Select } from '@mantine/core';

import { ORG_REVIEW_LOCATIONS } from '@jobstash/organizations/core';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const LocationSelect = () => {
  const {
    review: { location },
    setLocation,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Heading size="md" fw="semibold">
          Location
        </Heading>
      </div>
      <div className="w-full">
        <Select
          withinPortal
          allowDeselect
          size="lg"
          placeholder="Select Location"
          data={ORG_REVIEW_LOCATIONS}
          classNames={{
            input:
              'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
            itemsWrapper: 'bg-dark',
            item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          }}
          value={location}
          onChange={setLocation}
        />
      </div>
    </div>
  );
};

export default LocationSelect;
