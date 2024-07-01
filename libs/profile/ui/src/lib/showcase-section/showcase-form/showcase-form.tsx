import { useProfileShowcaseContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

import ShowcaseItemLayout from '../showcase-item-layout';

import AddItemButton from './add-item-button';
import LabelInput from './label-input';
import UrlInput from './url-input';

const ShowcaseForm = () => {
  const { displayForm, isLoading, onToggleForm } = useProfileShowcaseContext();

  return (
    <>
      {displayForm && (
        <ShowcaseItemLayout
          labelInput={<LabelInput />}
          urlInput={<UrlInput />}
          iconButton={<AddItemButton />}
        />
      )}

      <div className="pt-2 flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          isDisabled={isLoading.query || isLoading.mutation}
          onClick={onToggleForm}
        >
          Add More Documents
        </Button>
      </div>
    </>
  );
};

export default ShowcaseForm;
