import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { projectDetailsSchema } from '~/projects/core/schemas';

interface Props {
  projectId: string;
}

export const getProjectDetails = ({ projectId }: Props) => {
  const url = `${MW_URL}/projects/details/${projectId}`;

  return mwGET({
    url,
    label,
    responseSchema: projectDetailsSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};

const label = 'getProjectDetails';
