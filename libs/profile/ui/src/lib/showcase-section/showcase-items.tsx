import { useProfileShowcaseContext } from '@jobstash/profile/state';

import ShowcaseItem from './showcase-item';
import ShowcaseSkeleton from './showcase-skeleton';

const ShowcaseItems = () => {
  const { showcases, isLoading } = useProfileShowcaseContext();

  if (!isLoading.query && showcases.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 sm:gap-4 pb-4 sm:pb-0">
      {isLoading.query ? (
        <ShowcaseSkeleton itemCount={showcases.length} />
      ) : (
        showcases.map((showcase) => (
          <ShowcaseItem key={showcase.id} showcase={showcase} />
        ))
      )}
    </div>
  );
};

export default ShowcaseItems;
