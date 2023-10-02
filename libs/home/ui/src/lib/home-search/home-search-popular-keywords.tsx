import { motion } from 'framer-motion';

import { Text } from '@jobstash/shared/ui';

const keywords = [
  'senior software engineer',
  'backend developer',
  'data engineering team lead',
  'QA & Testing',
  'systems engineer',
  'Product Manager',
  'Full Stack Engineer',
  'lead platform engineer',
  'Developer Advocate',
  'Technical Writer',
  'UI/UX Designer',
  'Smart Contract Engineer',
  'Senior React Developer',
  'Blockchain Infrastructure Engineer',
];

const keywordAnimationVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
    },
  }),
};

const HomeSearchPopularKeywords = () => (
  <div className="flex items-center justify-end flex-wrap gap-4 w-full">
    {keywords.map((w, index) => (
      <motion.div
        key={w}
        className="border border-white/20 p-2 rounded-xl"
        variants={keywordAnimationVariants}
        initial="initial"
        animate="animate"
        custom={index}
      >
        <Text color="dimmed">{w}</Text>
      </motion.div>
    ))}
  </div>
);

export default HomeSearchPopularKeywords;
