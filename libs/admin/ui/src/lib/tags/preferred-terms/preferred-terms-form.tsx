import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import AdminFormControl from '../../admin-form-control';

import PreferredTermsActions from './actions';
import { PrimaryTermInput } from './primary-term-input';
import SynonymsInput from './synonyms-input';
import SynonymsList from './synonyms-list';

const PreferredTermsForm = () => {
  const { synonyms, primaryTerm } = usePreferredTermsFormContext();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col p-12 pb-8 w-1/2 gap-8 relative border border-gray rounded-lg">
        <AdminFormControl label="Primary Term" input={<PrimaryTermInput />} />
        <AdminFormControl
          label="List of Synonyms"
          input={<SynonymsInput />}
          isDisabled={!primaryTerm}
        />

        {synonyms.length > 0 && (
          <AdminFormControl label="" input={<SynonymsList />} />
        )}
        <PreferredTermsActions />
      </div>
    </div>
  );
};

export default PreferredTermsForm;
