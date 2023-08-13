import { Checkbox } from '@mantine/core';

import { useSalaryFormContext } from '@jobstash/profile/state';

const SalaryFormNoAllocationCheckbox = () => {
  const { state, setState } = useSalaryFormContext();

  return (
    <Checkbox
      label="No token allocation"
      checked={state.noAllocation}
      onChange={(e) => setState.setNoAllocation(e.currentTarget.checked)}
    />
  );
};

export default SalaryFormNoAllocationCheckbox;
