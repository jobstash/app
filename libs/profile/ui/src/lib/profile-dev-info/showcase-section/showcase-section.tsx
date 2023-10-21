import { LoadingOverlay } from '@mantine/core';

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
    <div className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 gap-4 relative">
      <LoadingOverlay
        visible={isLoading.showcaseMutation}
        className="rounded-3xl"
        loader={<Loader size="12" />}
      />
      <ShowcaseHeader />

      <ShowcaseItems />

      <ProfileShowcaseFormProvider>
        <ShowcaseForm />
      </ProfileShowcaseFormProvider>
    </div>
  );
};

export default ShowcaseSection;
