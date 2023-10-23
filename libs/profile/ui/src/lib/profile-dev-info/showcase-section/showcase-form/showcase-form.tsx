import { AnimatePresence, motion } from 'framer-motion';

import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

import AddAnotherButton from './add-another-button';
import AddItemButton from './add-item-button';
import LabelInput from './label-input';
import UrlInput from './url-input';

const ShowcaseForm = () => {
  const { displayForm } = useProfileShowcaseFormContext();

  if (!displayForm)
    return (
      <AnimatePresence mode="popLayout">
        <motion.div
          layout="position"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <AddAnotherButton />
        </motion.div>
      </AnimatePresence>
    );

  return (
    <motion.div
      layout="position"
      className="flex gap-4 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex-grow w-1/3">
        <LabelInput />
      </div>

      <div className="flex-grow">
        <UrlInput />
      </div>

      <div>
        <AddItemButton />
      </div>
    </motion.div>
  );
};

export default ShowcaseForm;
