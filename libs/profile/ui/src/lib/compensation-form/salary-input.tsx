import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import Input from './input';

const SalaryInput = () => {
  const {
    compensation: { salary, currency },
    setSalary,
  } = useProfileOrgReviewFormContext();

  return (
    <Input
      numberInput
      title="Amount (Per Year)"
      value={salary && currency ? salary : ''}
      isDisabled={!currency}
      onChange={(v: number | '') => setSalary(v ? Number(v) : null)}
    />
  );
};

export default SalaryInput;
