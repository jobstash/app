import { useProfileDevInfoContext } from '@jobstash/profile/state';

import ShowcaseItem from './showcase-item';

const ShowcaseItems = () => {
  const { showcases } = useProfileDevInfoContext();

  return (
    <div className="flex flex-col gap-4">
      {showcases.map(({ label, url }) => (
        <ShowcaseItem key={label} label={label} url={url} />
      ))}
    </div>
  );
};

export default ShowcaseItems;
