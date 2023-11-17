import { LoadingOverlay } from '@mantine/core';

import {
  usePreferredTermsContext,
  usePreferredTermsFormContext,
} from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';

import PreferredTermsActions from './actions';
import PrimaryTermInput from './primary-term-input';
import SynonymsInput from './synonyms-input';
import SynonymsList from './synonyms-list';

const PreferredTermsForm = () => {
  const {
    isLoadingMutation,
    synonyms,
    primaryTerm,
    isExisting,
    currentSynonyms,
  } = usePreferredTermsFormContext();

  const isDisabledSynonymsInput = !primaryTerm;
  const showSynonymsList = synonyms.length > 0;
  const { preferredTerms } = usePreferredTermsContext();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col p-12 pb-8 w-1/2 gap-8 relative border border-gray rounded-lg">
        {/* {isExisting ? (
          <pre>
            {JSON.stringify(
              { primaryTerm, synonyms, currentSynonyms },
              undefined,
              '\t',
            )}
          </pre>
        ) : (
          <pre>{JSON.stringify({ preferredTerms }, undefined, '\t')}</pre>
        )} */}

        <LoadingOverlay visible={isLoadingMutation} />
        <AdminFormControl label="Primary Term" input={<PrimaryTermInput />} />
        <AdminFormControl
          label="List of Synonyms"
          input={<SynonymsInput />}
          isDisabled={isDisabledSynonymsInput}
        />

        {showSynonymsList && (
          <AdminFormControl label="" input={<SynonymsList />} />
        )}
        <PreferredTermsActions />
      </div>
    </div>
  );
};

export default PreferredTermsForm;
