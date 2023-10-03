import { useQuery } from '@tanstack/react-query';

import { type Tag } from '@jobstash/shared/core';

import { getAllTags } from '@jobstash/shared/data';

interface Params {
  onSuccess: (data: { data: Tag[] }) => void;
}

export const useAllTags = (_params?: Params) => {
  const { onSuccess } = _params ?? { onSuccess: undefined };

  return useQuery({
    queryKey: ['all-technologies'],
    queryFn: () => getAllTags(),
    onSuccess,
  });
};
