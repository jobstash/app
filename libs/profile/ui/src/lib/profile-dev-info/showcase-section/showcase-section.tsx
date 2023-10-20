import { ProfileShowcaseFormProvider } from '@jobstash/profile/state';

import { ShowcaseForm } from './showcase-form';
import ShowcaseHeader from './showcase-header';
import ShowcaseItems from './showcase-items';

const ShowcaseSection = () => (
  <div className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 gap-4">
    <ShowcaseHeader />

    <ShowcaseItems />

    <ProfileShowcaseFormProvider>
      <ShowcaseForm />
    </ProfileShowcaseFormProvider>
  </div>
);

export default ShowcaseSection;
