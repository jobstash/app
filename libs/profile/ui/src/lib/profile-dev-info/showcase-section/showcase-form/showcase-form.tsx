import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

import AddAnotherButton from './add-another-button';
import AddItemButton from './add-item-button';
import LabelInput from './label-input';
import UrlInput from './url-input';

const ShowcaseForm = () => {
  const { displayForm } = useProfileShowcaseFormContext();

  if (!displayForm) return <AddAnotherButton />;

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-grow w-1/3">
        <LabelInput />
      </div>

      <div className="flex-grow">
        <UrlInput />
      </div>

      <AddItemButton />
    </div>
  );
};

export default ShowcaseForm;
