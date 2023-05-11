import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const fetchOrgProjects = async (id: string) => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/projects/all/${id}`, {
    mode: 'cors',
    credentials: 'include',
  });

  const { data } = await res.json();

  return data;
};
