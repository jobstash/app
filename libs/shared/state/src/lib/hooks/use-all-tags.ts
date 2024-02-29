import { useQuery } from '@tanstack/react-query';

import { type Tag } from '@jobstash/shared/core';

import { getAllTags } from '@jobstash/shared/data';

export const useAllTags = () =>
  useQuery({
    queryKey: ['all-technologies'],
    queryFn: () => getAllTags(),
  });
