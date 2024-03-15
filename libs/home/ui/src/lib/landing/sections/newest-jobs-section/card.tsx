import { JobPost } from '@jobstash/jobs/core';
import {
  featuredButtonStyle,
  featuredGradientBorderStyle,
  lato,
} from '@jobstash/shared/core';

import {
  CardSet,
  createJobTags,
  DraggableWrapper,
  Text,
} from '@jobstash/shared/ui';

interface Props {
  isFeatured?: boolean;
  job: JobPost;
}

export const Card = ({ job, isFeatured }: Props) => {
  const { title, summary } = job;
  const tags = createJobTags(job);

  return (
    <div
      className="bg-white/5 rounded-3xl p-6 flex flex-col gap-4 h-fit max-w-[360px]"
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
      <p className="text-md text-white/75 text-left">{summary}</p>
      <div className="max-w-xs">
        <DraggableWrapper>
          <div className="flex gap-x-4">
            {tags.map(({ id, text, link, icon }) => (
              <CardSet key={id} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        </DraggableWrapper>
      </div>
    </div>
  );
};
