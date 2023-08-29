import { useQuery } from '@tanstack/react-query';

import { type Technology } from '@jobstash/shared/core';

import { getAllTechnologies } from '@jobstash/shared/data';

interface Params {
  onSuccess: (data: { data: Technology[] }) => void;
}

export const useAllTechnologies = (_params?: Params) => {
  const { onSuccess } = _params ?? { onSuccess: undefined };

  return useQuery({
    queryKey: ['all-technologies'],
    queryFn: () => getAllTechnologies(),
    onSuccess,
  });
};
