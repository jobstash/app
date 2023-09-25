import { useTechnologiesStore } from '@jobstash/admin/state';

import AdminTechListItem from '../admin-tech-list-item';

const SynonymsList = () => {
  const synonyms = useTechnologiesStore((state) => state.synonyms);
  const removeSynonym = useTechnologiesStore(
    (state) => state.removeDestinationTerm,
  );

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {synonyms.map((tech) => (
        <AdminTechListItem
          key={tech}
          tech={tech}
          onRemove={(term) => removeSynonym(term)}
        />
      ))}
    </div>
  );
};

export default SynonymsList;
