import { useProfileShowcaseContext } from '@jobstash/profile/state';

import ShowcaseItemLayout from '../showcase-item-layout';

import AddItemButton from './add-item-button';
import FormToggler from './form-toggler';
import LabelInput from './label-input';
import UrlInput from './url-input';

const ShowcaseForm = () => {
  const { displayForm } = useProfileShowcaseContext();

  return (
    <>
      {displayForm && (
        <ShowcaseItemLayout
          labelInput={<LabelInput />}
          urlInput={<UrlInput />}
          iconButton={<AddItemButton />}
        />
      )}

      <div className="pt-2">
        <FormToggler />
      </div>
    </>
  );
};

export default ShowcaseForm;
