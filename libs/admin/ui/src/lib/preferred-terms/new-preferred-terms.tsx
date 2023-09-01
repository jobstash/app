import { LoadingOverlay } from '@mantine/core';

import { usePreferredTermsMutation } from '@jobstash/admin/state';

import AdminFormControl from '../admin-form-control';

const NewPreferedTerms = () => {
  const { isLoading, mutate } = usePreferredTermsMutation();

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col p-12 pb-8 w-1/2 gap-8 relative border border-gray rounded-lg">
        <LoadingOverlay visible={isLoading} />
        <AdminFormControl label="Primary Term" input={<p>TODO</p>} />
        <AdminFormControl label="List of Synonyms" input={<p>TODO</p>} />
      </div>
    </div>
  );
};

export default NewPreferedTerms;
