import { Checkbox as MCheckbox } from '@mantine/core';

import { useSalaryFormContext } from '@jobstash/profile/state';

const Checkbox = () => {
  const { state, setState } = useSalaryFormContext();

  return (
    <div className="flex justify-end">
      <MCheckbox
        size="md"
        label="Offers Token Allocation"
        color="gray"
        checked={state.offersTokenAllocation}
        onChange={(e) =>
          setState.setOffersTokenAllocation(e.currentTarget.checked)
        }
      />
    </div>
  );
};

export default Checkbox;
