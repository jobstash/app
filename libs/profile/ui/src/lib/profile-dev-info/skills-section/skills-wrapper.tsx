import { type ReactNode } from 'react';

import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const SkillsWrapper = ({ children }: Props) => (
  <>
    <motion.div layout>
      <hr className="border-t border-white/10" />
    </motion.div>

    <motion.div layout className="items-center justify-between lg:flex">
      <div className="flex flex-wrap gap-4">{children}</div>
    </motion.div>
  </>
);

export default SkillsWrapper;
