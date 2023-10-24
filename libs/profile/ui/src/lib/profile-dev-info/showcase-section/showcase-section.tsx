import { LoadingOverlay } from '@mantine/core';
import { motion } from 'framer-motion';

import {
  ProfileShowcaseFormProvider,
  useProfileDevInfoContext,
} from '@jobstash/profile/state';

import { Loader } from '@jobstash/shared/ui';

import { ShowcaseForm } from './showcase-form';
import ShowcaseHeader from './showcase-header';
import ShowcaseItems from './showcase-items';

const ShowcaseSection = () => {
  const { isLoading } = useProfileDevInfoContext();

  return (
    <motion.div
      layout
      className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 gap-4 relative"
    >
      <LoadingOverlay
        visible={isLoading.showcaseMutation}
        className="rounded-3xl"
        loader={<Loader isSmall />}
      />

      <ShowcaseHeader />

      <ShowcaseItems />

      <ProfileShowcaseFormProvider>
        <ShowcaseForm />
      </ProfileShowcaseFormProvider>
    </motion.div>
  );
};

export default ShowcaseSection;
