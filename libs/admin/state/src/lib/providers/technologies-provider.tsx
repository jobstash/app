import { type ReactNode, useMemo } from 'react';

import { useAllTechnologies } from '@jobstash/shared/state';

import { TechnologiesContext } from '../contexts/technologies-context';

interface Props {
  children: ReactNode;
}

export const TechnologiesProvider = ({ children }: Props) => {
  const { isLoading, data } = useAllTechnologies();

  const value = useMemo(
    () => ({
      isLoading,
      technologies: data?.data ?? [],
      mappedTechnologies: data?.data.map((t) => t.name) ?? [],
    }),
    [data, isLoading],
  );

  return (
    <TechnologiesContext.Provider value={value}>
      {children}
    </TechnologiesContext.Provider>
  );
};
