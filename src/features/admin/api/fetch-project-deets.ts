import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const fetchProjectDeets = async (id?: string) => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/projects/${id}`, {
    mode: 'cors',
    credentials: 'include',
  });
  const { data } = await res.json();
  console.log('project data =', data);

  return data;
};
