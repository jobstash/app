import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import AdminTechListItem from '../admin-tech-list-item';

const SynonymsList = () => {
  const { synonyms, removeSynonym } = usePreferredTermsFormContext();

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
