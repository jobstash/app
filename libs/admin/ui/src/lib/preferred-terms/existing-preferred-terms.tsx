import { useTechnologiesStore } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

const ExistingPreferredTerms = () => {
  const preferredTerms = useTechnologiesStore((state) => state.preferredTerms);
  const hasPreferredTerms = preferredTerms.length > 0;

  if (!hasPreferredTerms) return <p>No Existing Preferred Terms</p>;

  return (
    <div className="flex flex-col w-full gap-8 pt-12">
      <div className="flex w-full justify-center">
        <Heading size="md">Existing Preferred Terms</Heading>
      </div>
      <div className="flex w-full justify-center">
        <AdminTechContentWrapper>
          <p>TODO: ExistingPairedTerms</p>
          <pre>{JSON.stringify({ preferredTerms }, undefined, '\t')}</pre>
        </AdminTechContentWrapper>
      </div>
    </div>
  );
};

export default ExistingPreferredTerms;
