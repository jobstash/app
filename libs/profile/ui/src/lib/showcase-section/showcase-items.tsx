import { useProfileShowcaseContext } from '@jobstash/profile/state';

import ShowcaseItem from './showcase-item';
import ShowcaseSkeleton from './showcase-skeleton';

const ShowcaseItems = () => {
  const { showcases, isLoading } = useProfileShowcaseContext();

  if (!isLoading.query && showcases.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {isLoading.query ? (
        <ShowcaseSkeleton itemCount={showcases.length} />
      ) : (
        showcases.map((showcase) => (
          <div key={JSON.stringify({ showcase })}>
            <ShowcaseItem showcase={showcase} />
          </div>
        ))
      )}
    </div>
  );
};

export default ShowcaseItems;
