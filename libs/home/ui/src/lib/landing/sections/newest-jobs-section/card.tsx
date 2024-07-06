import { Button } from '@nextui-org/button';

import { JobPost } from '@jobstash/jobs/core';
import {
  featuredButtonStyle,
  featuredGradientBorderStyle,
  FRONTEND_URL,
  lato,
} from '@jobstash/shared/core';
import { checkJobIsFeatured } from '@jobstash/jobs/utils';
import { openNewTab } from '@jobstash/shared/utils';

import { CardSet, createJobTags, Text } from '@jobstash/shared/ui';

interface Props {
  job: JobPost;
}

export const Card = ({ job }: Props) => {
  const { title, summary, featureStartDate, featureEndDate } = job;
  const tags = createJobTags(job);

  const isFeatured = checkJobIsFeatured(featureStartDate, featureEndDate);

  return (
    <div className="w-full md:w-1/3 md:px-3">
      <div
        className="flex flex-wrap w-full h-full gap-4 p-6 bg-white/5 rounded-3xl"
        style={{
          ...(isFeatured ? featuredGradientBorderStyle : undefined),
          cursor: 'default',
        }}
      >
        {isFeatured && (
          <div style={featuredButtonStyle}>
            <Text size="sm" fw="bold">
              Featured
            </Text>
          </div>
        )}
        <h3
          className={`${lato.className} justify-center text-xl font-bold text-white`}
        >
          {title}
        </h3>
        <p className="text-left text-md text-white/75">{summary}</p>
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
          className="self-end w-full font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary"
          onClick={() => openJob(job)}
        >
          Explore Job
        </Button>
      </div>
    </div>
  );
};

const openJob = (job: JobPost) => {
  const url = `${FRONTEND_URL}/jobs/${job.shortUUID}/details`;
  openNewTab(url);
};
