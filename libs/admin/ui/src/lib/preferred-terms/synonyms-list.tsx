import {
  usePreferredTermsContext,
  usePreferredTermsFormContext,
} from '@jobstash/admin/state';

import { Spinner } from '@jobstash/shared/ui';

import AdminTechListItem from '../admin-tech-list-item';

const SynonymsList = () => {
  const { isFetching } = usePreferredTermsContext();
  const { synonyms, removeSynonym, isLoadingMutation } =
    usePreferredTermsFormContext();

  if (isFetching || isLoadingMutation) return <Spinner />;

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
