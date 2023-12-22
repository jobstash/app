import { ProfileShowcaseProvider } from '@jobstash/profile/state';

import { ShowcaseForm } from './showcase-form';
import ShowcaseHeader from './showcase-header';
import ShowcaseItems from './showcase-items';

const ProfileShowcaseSection = () => (
  <ProfileShowcaseProvider>
    <div className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 gap-4 relative">
      <ShowcaseHeader />

      <ShowcaseItems />
      <ShowcaseForm />
    </div>
  </ProfileShowcaseProvider>
);

export default ProfileShowcaseSection;
