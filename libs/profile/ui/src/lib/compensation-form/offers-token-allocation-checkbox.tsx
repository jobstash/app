import { Checkbox as MCheckbox } from '@mantine/core';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

const OffersTokenAllocationCheckbox = () => {
  const {
    compensation: { offersTokenAllocation },
    setOffersTokenAllocation,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex justify-end">
      <MCheckbox
        size="md"
        label="Offers Token Allocation"
        color="gray"
        checked={offersTokenAllocation}
        onChange={(e) => setOffersTokenAllocation(e.currentTarget.checked)}
      />
    </div>
  );
};

export default OffersTokenAllocationCheckbox;
