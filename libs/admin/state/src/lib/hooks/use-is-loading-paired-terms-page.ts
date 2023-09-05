import {
  useAllTechnologies,
  useDelayedAuthRender,
} from '@jobstash/shared/state';

import { useTechnologiesStore } from '../store/technologies-store';

import { usePairedTermsQuery } from './use-paired-terms-query';

export const useIsLoadingPairedTermsPage = () => {
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

  const { isLoadingPairedTermsQuery } = usePairedTermsQuery();

  return [
    !canRender,
    isLoadingTechnologies,
    isLoadingPairedTermsQuery,
  ].includes(true);
};
