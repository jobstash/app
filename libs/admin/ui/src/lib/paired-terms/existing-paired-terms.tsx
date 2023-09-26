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
    <div className="flex flex-col w-full gap-8 pt-12">
      <div className="flex w-full justify-center">
        <Heading size="md">Existing Paired Terms</Heading>
      </div>
      <div className="flex flex-col gap-12 w-full justify-center">
        {pairedTerms.map((pairedTerm) => (
          <PairedTermsFormProvider
            key={pairedTerm.technology.id}
            initOrigin={pairedTerm.technology.name}
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
