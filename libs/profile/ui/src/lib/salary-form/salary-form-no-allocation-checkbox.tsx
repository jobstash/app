import { Checkbox } from '@mantine/core';

import { useSalaryFormContext } from '@jobstash/profile/state';

const SalaryFormNoAllocationCheckbox = () => {
  const { state, setState } = useSalaryFormContext();

  return (
    <div className="flex justify-end">
      <Checkbox
        size="md"
        label="No token allocation"
        checked={state.noAllocation}
        onChange={(e) => setState.setNoAllocation(e.currentTarget.checked)}
      />
    </div>
  );
};

export default SalaryFormNoAllocationCheckbox;
