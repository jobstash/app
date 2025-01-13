import {
  PairedTermsFormProvider,
  usePairedTermsContext,
} from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import PairedTermForm from './paired-term-form';

const ExistingPairedTermsX = () => {
  const { pairedTerms } = usePairedTermsContext();
  const hasPairedTerms = pairedTerms.length > 0;

  if (!hasPairedTerms) return <p>No Existing Paired Terms</p>;

  return (
    <div className="flex flex-col w-full gap-8 lg:pt-12">
      <div className="flex justify-center w-full">
        <Heading size="md">Existing Paired Terms</Heading>
      </div>
      <div className="flex flex-col justify-center w-full gap-12">
        {pairedTerms.map((pairedTerm) => (
          <PairedTermsFormProvider
            key={pairedTerm.tag.id}
            initOrigin={pairedTerm.tag.name}
            initDestination={pairedTerm.pairings.map((t) => t.name)}
          >
            <PairedTermForm />
          </PairedTermsFormProvider>
        ))}
      </div>
    </div>
  );
};

export default ExistingPairedTermsX;
