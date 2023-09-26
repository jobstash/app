import { LoadingOverlay } from '@mantine/core';

import { usePairedTermsFormContext } from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';
import AdminTechContentWrapper from '../admin-tech-content-wrapper';

import PairedTermsActions from './actions';
import DestinationInput from './destination-input';
import DestinationList from './destination-list';
import OriginInput from './origin-input';

const PairedTermForm = () => {
  const { origin, destination, isLoading } = usePairedTermsFormContext();
  const showDestinationList = destination.length > 0;

  return (
    <div className="flex w-full justify-center">
      <AdminTechContentWrapper>
        <LoadingOverlay visible={isLoading} />
        <AdminFormControl label="Origin" input={<OriginInput />} />
        <AdminFormControl
          label="Destination"
          input={<DestinationInput />}
          isDisabled={!origin}
        />
        {showDestinationList && (
          <AdminFormControl label="" input={<DestinationList />} />
        )}
        <PairedTermsActions />
      </AdminTechContentWrapper>
    </div>
  );
};

export default PairedTermForm;
