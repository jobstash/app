import { usePairedTermsFormContext } from '@jobstash/admin/state';

import AdminTechListItem from '../../admin-tech-list-item';

const DestinationListX = () => {
  const { destination, removeDestination } = usePairedTermsFormContext();

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {destination.map((tech) => (
        <AdminTechListItem
          key={tech}
          tech={tech}
          onRemove={(term) => removeDestination(term)}
        />
      ))}
    </div>
  );
};

export default DestinationListX;
