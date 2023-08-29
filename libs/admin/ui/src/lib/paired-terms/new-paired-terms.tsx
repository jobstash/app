import { usePairedTermsStore } from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';

import DestinationInput from './destination-input';
import DestinationList from './destination-list';
import OriginInput from './origin-input';

const NewPairedTerms = () => {
  const isDisabledDestination = usePairedTermsStore((store) => !store.origin);

  return (
    <div className="flex flex-col w-full gap-8">
      <AdminFormControl label="Origin" input={<OriginInput />} />
      <AdminFormControl
        label="Destination"
        input={<DestinationInput />}
        isDisabled={isDisabledDestination}
      />
      <AdminFormControl label="" input={<DestinationList />} />
    </div>
  );
};

export default NewPairedTerms;
