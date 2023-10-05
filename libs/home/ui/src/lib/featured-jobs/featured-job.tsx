import { motion } from 'framer-motion';

import { type JobPost } from '@jobstash/jobs/core';
import { TagElement } from '@jobstash/shared/core';
import { getLogoUrl, prettyTimestamp } from '@jobstash/shared/utils';

import { CardSet, createJobTags, LogoTitle } from '@jobstash/shared/ui';

interface Props {
  job: JobPost;
}
const FeaturedJob = (props: Props) => {
  const { job } = props;
  const { title, firstSeenTimestamp, organization: org } = job;
  const tags = limitTagLength(createJobTags(job));

  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-3 p-4 px-3 rounded-2xl bg-white/5 hover:cursor-pointer hover:transition-all hover:duration-500 hover:bg-white/10"
      whileHover={{
        scale: 1.025,
      }}
    >
      <LogoTitle
        title={title}
        location={`${org.name} • ${prettyTimestamp(firstSeenTimestamp)}`}
        avatarProps={{
          src: getLogoUrl(org.website, org.logoUrl),
          alt: org.name,
        }}
      />

      <div className="flex flex-wrap px-2 [&>*]:mr-4">
        {tags.map(({ id, text, link, icon }) => (
          <CardSet key={id} link={link} icon={icon}>
            {text}
          </CardSet>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedJob;

const limitTagLength = (tags: TagElement[]): TagElement[] => {
  const f3Tags = tags.slice(0, 4);

  const totalCharCount = f3Tags
    .map((t) => t.text)
    .reduce((count, tag) => count + tag.length, 0);

  return totalCharCount < 34 ? f3Tags : tags.slice(0, 3);
};
