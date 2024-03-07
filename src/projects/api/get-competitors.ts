import { MW_URL } from '~/shared/core/envs';
import { competitorsResponseSchema } from '~/shared/core/schemas';
import { mwGET } from '~/shared/utils/mw-get';

const label = 'getCompetitors';

export const getCompetitors = async (projectId: string) => {
  const url = `${MW_URL}/projects/competitors/${projectId}`;

  return mwGET({
    url,
    label,
    responseSchema: competitorsResponseSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
