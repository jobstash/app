import {
  useAllTechnologies,
  useDelayedAuthRender,
} from '@jobstash/shared/state';

import { useTechnologiesStore } from '../store/technologies-store';

import { useBlockedTechnologiesQuery } from './use-blocked-technologies-query';

export const useIsLoadingBlockedTermsPage = () => {
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

  const { isLoadingInitBlockedTerms } = useBlockedTechnologiesQuery();

  return [
    !canRender,
    isLoadingTechnologies,
    isLoadingInitBlockedTerms,
  ].includes(true);
};
