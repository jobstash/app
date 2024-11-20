import { Button } from '@nextui-org/button';

import {
  featuredButtonStyle,
  featuredGradientBorderStyle,
  FRONTEND_URL,
  JobPost,
  lato,
} from '@jobstash/shared/core';
import { checkJobIsFeatured, getJobLogoTitleProps } from '@jobstash/jobs/utils';
import { openNewTab } from '@jobstash/shared/utils';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';
import { CardSet, createJobTags, Text } from '@jobstash/shared/ui';

interface Props {
  job: JobPost;
}

export const Card = ({ job }: Props) => {
  const { title, summary, featureStartDate, featureEndDate } = job;
  const tags = createJobTags(job);

  const isFeatured = checkJobIsFeatured(featureStartDate, featureEndDate);

  const { name, website, logo } = getJobLogoTitleProps(job);

  return (
    <div className="w-full md:w-1/3 md:px-3">
      <div
        className="flex flex-col items-start w-full h-full p-6 gap-y-4 bg-white/5 rounded-3xl"
        style={{
          ...(isFeatured ? featuredGradientBorderStyle : undefined),
          cursor: 'default',
        }}
      >
        <div className="flex flex-col grow gap-y-4">
          {isFeatured && (
            <div style={featuredButtonStyle}>
              <Text size="sm" fw="bold">
                Featured
              </Text>
            </div>
          )}
          <div className="w-full">
            <LogoTitle
              title={name ?? ''}
              avatarProps={{
                src: getLogoUrl(website ?? '', logo),
                alt: name ?? '',
              }}
              size="sm"
            />
          </div>
          <h3
            className={`${lato.className} justify-center text-xl font-bold text-white shrink -mt-1 w-full`}
          >
            {title}
          </h3>

          <p className="text-left text-md text-white/75">{summary}</p>
        </div>
        <div className="flex flex-col self-end w-full gap-4">
          <div className="max-w-xs">
            <div className="flex flex-wrap gap-x-4 gap-y-0">
              {tags.map(({ id, text, link, icon }) => (
                <CardSet key={id} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>
          </div>
          <Button
            className="w-full font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary"
            onClick={() => openJob(job)}
          >
            Explore Job
          </Button>
        </div>
      </div>
    </div>
  );
};

const openJob = (job: JobPost) => {
  const url = `${FRONTEND_URL}/jobs/${job.shortUUID}/details`;
  openNewTab(url);
};
