import { usePreferredTermsMutation, useTagsStore } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PreferredTermsActions = () => {
  const primaryTerm = useTagsStore((state) => state.primaryTerm);
  const synonyms = useTagsStore((state) => state.synonyms);

  const { mutate } = usePreferredTermsMutation();

  const onSubmit = () => {
    mutate({
      preferredName: primaryTerm,
      synonyms,
    });
  };

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button variant="primary" className="px-6" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PreferredTermsActions;
