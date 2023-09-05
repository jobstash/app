import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';
import AdminTechContentWrapper from '../admin-tech-content-wrapper';

import PairedTermsActions from './actions';
import DestinationInput from './destination-input';
import DestinationList from './destination-list';
import OriginInput from './origin-input';

const NewPairedTerms = () => {
  const isDisabledDestination = useTechnologiesStore((store) => !store.origin);
  const destinationTerms = useTechnologiesStore(
    (store) => store.destinationTerms,
  );

  const showDestinationList = destinationTerms.length > 0;

  return (
    <div className="flex w-full justify-center">
      <AdminTechContentWrapper>
        <AdminFormControl label="Origin" input={<OriginInput />} />
        <AdminFormControl
          label="Destination"
          input={<DestinationInput />}
          isDisabled={isDisabledDestination}
        />
        {showDestinationList && (
          <AdminFormControl label="" input={<DestinationList />} />
        )}
        <PairedTermsActions />
      </AdminTechContentWrapper>
    </div>
  );
};

export default NewPairedTerms;
