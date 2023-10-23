import { motion } from 'framer-motion';

import { Heading, Text } from '@jobstash/shared/ui';
const ShowcaseHeader = () => (
  <>
    <motion.div layout>
      <Heading size="md">Showcase Your Work</Heading>
    </motion.div>
    <motion.div layout>
      <Text color="dimmed">
        Add link to your CV, Portfolio or Website and increase the chance of
        getting hired.
      </Text>
    </motion.div>
  </>
);

export default ShowcaseHeader;
