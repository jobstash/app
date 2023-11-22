import { Checkbox as MCheckbox } from '@mantine/core';

import { useSalaryFormContext } from '@jobstash/profile/state';

const Checkbox = () => {
  const { state, setState } = useSalaryFormContext();

  return (
    <div className="flex justify-end">
      <MCheckbox
        size="md"
        label="No token allocation"
        checked={state.offersTokenAllocation}
        onChange={(e) =>
          setState.setOffersTokenAllocation(e.currentTarget.checked)
        }
      />
    </div>
  );
};

export default Checkbox;
