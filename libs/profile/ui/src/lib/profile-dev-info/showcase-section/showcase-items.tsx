import { useProfileDevInfoContext } from '@jobstash/profile/state';

import ShowcaseItem from './showcase-item';
import ShowcaseSkeleton from './showcase-skeleton';

const ShowcaseItems = () => {
  const { showcases, isLoading } = useProfileDevInfoContext();

  if (!isLoading.showcaseQuery && showcases.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {isLoading.showcaseQuery ? (
        <ShowcaseSkeleton />
      ) : (
        showcases.map(({ label, url }) => (
          <ShowcaseItem key={label} label={label} url={url} />
        ))
      )}
    </div>
  );
};

export default ShowcaseItems;
