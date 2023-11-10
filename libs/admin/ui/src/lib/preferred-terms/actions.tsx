import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PreferredTermsActions = () => {
  const {
    isExisting,
    isSuccess,
    primaryTerm,
    currentSynonyms,
    mutateCreatePreference,
    mutateDeletePreference,
    clearForm,
    isDisabledSubmit,
  } = usePreferredTermsFormContext();

  const onSubmit = () => {
    if (currentSynonyms.created.length > 0) {
      mutateCreatePreference({
        preferredName: primaryTerm,
        synonyms: currentSynonyms.created,
      });
    }

    if (currentSynonyms.deleted.length > 0) {
      mutateDeletePreference({
        preferredName: primaryTerm,
        synonyms: currentSynonyms.deleted,
      });
    }

    if (!isExisting && isSuccess) {
      clearForm();
    }
  };

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          className="px-6"
          isDisabled={isDisabledSubmit}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PreferredTermsActions;
