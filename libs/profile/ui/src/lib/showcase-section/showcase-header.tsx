import { motion } from 'framer-motion';

import { Heading, Text } from '@jobstash/shared/ui';
const ShowcaseHeader = () => (
  <>
    <motion.div layout>
      <Heading size="md">Your Links</Heading>
    </motion.div>
    <motion.div layout>
      <Text color="dimmed">
        Showcase your expertise by adding links to your CV, Portfolio and things
        you built
      </Text>
    </motion.div>
  </>
);

export default ShowcaseHeader;
