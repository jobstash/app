import { motion } from 'framer-motion';

import { useProfileDevInfoContext } from '@jobstash/profile/state';

import ShowcaseItem from './showcase-item';
import ShowcaseSkeleton from './showcase-skeleton';

const ShowcaseItems = () => {
  const { showcases, isLoading } = useProfileDevInfoContext();

  if (!isLoading.showcaseQuery && showcases.length === 0) return null;

  return (
    <motion.div layout className="flex flex-col gap-4">
      {isLoading.showcaseQuery ? (
        <ShowcaseSkeleton />
      ) : (
        showcases.map(({ label, url }) => (
          <motion.div key={label} layout>
            <ShowcaseItem label={label} url={url} />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default ShowcaseItems;
