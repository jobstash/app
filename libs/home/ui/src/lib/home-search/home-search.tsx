import { motion } from 'framer-motion';

import { useHomeSearchContext } from '@jobstash/home/state';

import HomeSearchInput from './home-search-input';
import HomeSearchPopularKeywords from './home-search-popular-keywords';
import HomeSearchSelection from './home-search-selection';

const HomeSearch = () => {
  const { showPopularKeywords } = useHomeSearchContext();

  return (
    <motion.div layout className="lg:pt-8 flex flex-col gap-6">
      <motion.div
        layout
        className="p-0.5 w-full bg-white/10 rounded-xl flex items-center"
      >
        <HomeSearchSelection />
        <div className="border-transparent border-2 border-r-dark-gray w-4 h-12" />
        <HomeSearchInput />
      </motion.div>

      {showPopularKeywords && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <HomeSearchPopularKeywords />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomeSearch;
