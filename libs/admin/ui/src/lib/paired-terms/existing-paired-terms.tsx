import { useTechnologiesStore } from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import AdminTechContentWrapper from '../admin-tech-content-wrapper';

const ExistingPairedTerms = () => {
  const pairedTerms = useTechnologiesStore((state) => state.pairedTerms);
  const hasPairedTerms = pairedTerms.length > 0;

  if (!hasPairedTerms) return <p>No Existing Paired Terms</p>;

  return (
    <div className="flex flex-col w-full gap-8 pt-12">
      <div className="flex w-full justify-center">
        <Heading size="md">Existing Paired Terms</Heading>
      </div>
      <div className="flex w-full justify-center">
        <AdminTechContentWrapper>
          <p>TODO: ExistingPairedTerms</p>
          <pre>{JSON.stringify({ pairedTerms }, undefined, '\t')}</pre>
        </AdminTechContentWrapper>
      </div>
    </div>
  );
};

export default ExistingPairedTerms;
