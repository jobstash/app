import { motion } from 'framer-motion';

import { Heading, Text } from '@jobstash/shared/ui';
const ShowcaseHeader = () => (
  <>
    <motion.div layout>
      <Heading size="md">Your Documents: CV, Portfolio & More</Heading>
    </motion.div>
    <motion.div layout>
      <Text color="dimmed">
        Add a link to your CV, Portfolio and things you've built in the past.
      </Text>
    </motion.div>
  </>
);

export default ShowcaseHeader;
