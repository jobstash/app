import {
  usePairedTermsContext,
  usePairedTermsStore,
} from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';
import AdminTechContentWrapper from '../admin-tech-content-wrapper';

import PairedTermsActions from './actions';
import DestinationInput from './destination-input';
import DestinationList from './destination-list';
import OriginInput from './origin-input';

const NewPairedTerms = () => {
  const isDisabledDestination = usePairedTermsStore((store) => !store.origin);
  const destinationTerms = usePairedTermsStore(
    (store) => store.destinationTerms,
  );

  const showDestinationList = destinationTerms.length > 0;

  const { isLoading } = usePairedTermsContext();

  return (
    <div className="flex w-full justify-center">
      <AdminTechContentWrapper isLoading={isLoading}>
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
