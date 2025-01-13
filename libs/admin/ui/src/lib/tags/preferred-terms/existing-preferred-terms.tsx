import {
  PreferredTermsFormProvider,
  usePreferredTermsContext,
} from '@jobstash/admin/state';

import { Heading } from '@jobstash/shared/ui';

import PreferredTermsForm from './preferred-terms-form';

const ExistingPreferredTerms = () => {
  const { preferredTerms } = usePreferredTermsContext();

  const hasPreferredTerms = preferredTerms.length > 0;

  if (!hasPreferredTerms) return <p>No Existing Preferred Terms</p>;

  return (
    <div className="flex flex-col w-full gap-8 lg:pt-12">
      <div className="flex justify-center w-full">
        <Heading size="md">Existing Preferred Terms</Heading>
      </div>
      <div className="flex flex-col justify-center w-full gap-12">
        {preferredTerms.map((preferredTerm) => (
          <PreferredTermsFormProvider
            key={preferredTerm.tag.id}
            initPrimaryTerm={preferredTerm.tag.name}
            initSynonyms={(preferredTerm.synonyms ?? []).map((s) => s.name)}
          >
            <PreferredTermsForm />
          </PreferredTermsFormProvider>
        ))}
      </div>
    </div>
  );
};

export default ExistingPreferredTerms;
