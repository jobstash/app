import {
  useAllTechnologies,
  useDelayedAuthRender,
} from '@jobstash/shared/state';

import { useTechnologiesStore } from '../store/technologies-store';

import { usePreferredTermsQuery } from './use-preferred-terms-query';

export const useIsLoadingSynonymsPage = () => {
  const { canRender } = useDelayedAuthRender();

  const setTechnologies = useTechnologiesStore(
    (state) => state.setTechnologies,
  );

  const { isLoading: isLoadingTechnologies } = useAllTechnologies({
    onSuccess({ data }) {
      const terms = data.length > 0 ? data.map((d) => d.name) : [];
      setTechnologies(terms);
    },
  });

  const { isLoadingPreferredTerms } = usePreferredTermsQuery();

  return [!canRender, isLoadingTechnologies, isLoadingPreferredTerms].includes(
    true,
  );
};
