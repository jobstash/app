import { Metadata } from 'next';

import { getFrameMetadata } from '@coinbase/onchainkit';

import { DEFAULT_CURRENCY, METADATA } from '~/shared/core/constants';
import { FRONTEND_URL, JOB_FRAME_URL } from '~/shared/core/envs';
import { formatNumber } from '~/shared/utils/format-number';

import { getJobDetails } from '~/jobs/api/get-job-details';

export { JobParamsPage as default } from '~/jobs/pages/job-params-page';

export const generateMetadata = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> => {
  const jobDetails = await getJobDetails(id);
  const {
    shortUUID,
    organization,
    title,
    summary,
    minimumSalary,
    maximumSalary,
    salaryCurrency,
  } = jobDetails;

  const url = `${FRONTEND_URL}/jobs/${shortUUID}/details`;
  const imageUrl = `${JOB_FRAME_URL}/api/jobs?id=${shortUUID}&tab=details`;

  let salaryText = '';
  if (minimumSalary && maximumSalary) {
    const currency = salaryCurrency ?? DEFAULT_CURRENCY;
    const min = formatNumber(minimumSalary);
    const max = formatNumber(maximumSalary);
    salaryText = ` 💵 ${currency} ${min} - ${max}`;
  }
  const description = `${summary ?? ''}${salaryText}`;

  const frameMetadata = getFrameMetadata({
    buttons: [{ label: 'Prev' }, { label: 'Next' }],
    image: imageUrl,
    postUrl: url,
  });

  // TODO: handle canonical url for /organization, /projects etc

  return {
    title: `Jobs at ${organization?.name} | ${title}`,
    description,
    metadataBase: new URL(url),
    alternates: { canonical: url },
    openGraph: {
      title,
      siteName: METADATA.SITE_NAME,
      description,
      images: [{ url: imageUrl, ...METADATA.IMAGE_DIMENSION }],
      url,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: METADATA.TWITTER_CARD,
      creator: METADATA.TWITTER_CREATOR,
    },
    other: frameMetadata,
  };
};
