import {
  usePairedTermsContext,
  usePairedTermsStore,
} from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

const ExistingPairedTerms = () => {
  const { isLoading } = usePairedTermsContext();

  const pairedTerms = usePairedTermsStore((state) => state.pairedTerms);
  const hasPairedTerms = pairedTerms.length > 0;

  if (!hasPairedTerms) return null;

  return (
    <div className="flex flex-col w-full gap-8 pt-12">
      <div className="flex w-full justify-center">
        <Heading size="md">Existing Paired Terms</Heading>
      </div>
      <div className="flex w-full justify-center">
        <AdminTechContentWrapper isLoading={isLoading} showLoader={false}>
          <p>TODO: ExistingPairedTerms</p>
        </AdminTechContentWrapper>
      </div>
    </div>
  );
};

export default ExistingPairedTerms;
