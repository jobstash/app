import { memo, useMemo } from 'react';

import { createJobTags } from '~/features/jobs/utils';
import { CardSet } from '~/shared/components';
import { JobPost } from '~/shared/core/interfaces';

interface Props {
  jobPost: JobPost;
}

const JobCardTags = ({ jobPost }: Props) => {
  const tags = useMemo(() => createJobTags(jobPost), [jobPost]);

  return (
    <div className="flex flex-wrap [&>*]:mr-4">
      {tags.map(({ text, link, icon }) => (
        <CardSet key={text} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(JobCardTags);
