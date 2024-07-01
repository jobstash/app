import { useProfileShowcaseContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import { ShowcaseForm } from './showcase-form';
import ShowcaseItem from './showcase-item';

const ProfileShowcaseSection = () => {
  const { showcases, isLoading } = useProfileShowcaseContext();

  return (
    <div className="flex flex-col gap-4 relative px-1 pb-4">
      <div className="flex items-center gap-4">
        <Text color="dimmed">
          Add a link to your CV, Portfolio and things you&#39;ve built in the
          past.
        </Text>
      </div>

      {!isLoading.query && showcases.length > 0 && (
        <div className="flex flex-col gap-8 sm:gap-4 pb-4 sm:pb-0">
          {showcases.map((showcase) => (
            <ShowcaseItem key={showcase.id} showcase={showcase} />
          ))}
        </div>
      )}

      <ShowcaseForm />
    </div>
  );
};

export default ProfileShowcaseSection;
