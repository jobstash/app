import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminTechListItem from '../admin-tech-list-item';

const DestinationList = () => {
  const destinationTerms = useTechnologiesStore(
    (store) => store.destinationTerms,
  );
  const removeDestinationTerm = useTechnologiesStore(
    (store) => store.removeDestinationTerm,
  );

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {destinationTerms.map((tech) => (
        <AdminTechListItem
          key={tech}
          tech={tech}
          onRemove={(term) => removeDestinationTerm(term)}
        />
      ))}
    </div>
  );
};

export default DestinationList;
