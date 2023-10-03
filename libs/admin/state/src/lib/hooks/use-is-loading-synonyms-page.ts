import { useAllTags, useDelayedAuthRender } from '@jobstash/shared/state';

import { useTagsStore } from '../store/tags-store';

import { usePreferredTermsQuery } from './use-preferred-terms-query';

export const useIsLoadingSynonymsPage = () => {
  const { canRender } = useDelayedAuthRender();

  const setTags = useTagsStore((state) => state.setTags);

  const { isLoading: isLoadingTags } = useAllTags({
    onSuccess({ data }) {
      const terms = data.length > 0 ? data.map((d) => d.name) : [];
      setTags(terms);
    },
  });

  const { isLoadingPreferredTerms } = usePreferredTermsQuery();

  return [!canRender, isLoadingTags, isLoadingPreferredTerms].includes(true);
};
