import { useQuery } from '@tanstack/react-query';

import { getAllTechnologies } from '@jobstash/shared/data';

export const useAllTechnologies = () =>
  useQuery({
    queryKey: ['all-technologies'],
    queryFn: () => getAllTechnologies(),
  });
