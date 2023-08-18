import {
  useProfileReviewsPageContext,
  useSalaryFormContext,
} from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const SalaryFormTokenInput = () => {
  const {
    orgReview: { salary },
  } = useProfileReviewsPageContext();
  const { state, setState } = useSalaryFormContext();

  return (
    <SalaryInput
      isDisabled={state.noAllocation}
      options={salary.token.options}
      value={state.noAllocation ? null : state.token}
      title="Token"
      onChange={setState.setToken}
    />
  );
};

export default SalaryFormTokenInput;
