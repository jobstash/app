import { type ReactNode, useMemo } from 'react';

import { useAllTags } from '@jobstash/shared/state';

import { TagsContext } from '../contexts/tags-context';

interface Props {
  children: ReactNode;
}

export const TagsProvider = ({ children }: Props) => {
  const { isLoading, data } = useAllTags();

  const value = useMemo(
    () => ({
      isLoading,
      technologies: data?.data ?? [],
      mappedTags: data?.data.map((t) => t.name) ?? [],
    }),
    [data, isLoading],
  );

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};
