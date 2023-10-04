import { motion } from 'framer-motion';

import { type JobPost } from '@jobstash/jobs/core';
import { TagElement } from '@jobstash/shared/core';
import { getLogoUrl, prettyTimestamp } from '@jobstash/shared/utils';

import { CardSet, createJobTags, LogoTitle, Text } from '@jobstash/shared/ui';

interface Props {
  job: JobPost;
}
const FeaturedJob = (props: Props) => {
  const { job } = props;
  const {
    jobTitle,
    jobCreatedTimestamp,
    organization: org,
    role,
    benefits,
    team,
  } = job;
  const tags = limitTagLength(createJobTags(job));
  const description = limitRoleLength(
    role ?? benefits ?? team ?? DEFAULT_DESCRIPTION,
  );

  return (
    <motion.div
      className="w-full h-fit flex flex-col gap-3 p-4 px-3 rounded-3xl bg-white/5 hover:cursor-pointer hover:transition-all hover:duration-500 hover:bg-white/10"
      whileHover={{
        scale: 1.025,
      }}
    >
      <LogoTitle
        title={jobTitle}
        location={`${org.name} • ${prettyTimestamp(jobCreatedTimestamp)}`}
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

      <div className="px-2">
        <Text color="dimmed">{description}</Text>
      </div>
    </motion.div>
  );
};

export default FeaturedJob;

const MAX_ROLE_TEXT_LENGTH = 157;
const MAX_TAG_TEXT_LENGTH = 45;
const DEFAULT_DESCRIPTION = 'Click for more details';

const limitRoleLength = (role: string) =>
  role.length > MAX_ROLE_TEXT_LENGTH
    ? `${role.slice(0, MAX_ROLE_TEXT_LENGTH + 1)} ...`
    : role;

const limitTagLength = (tags: TagElement[]): TagElement[] => {
  let currentLength = 0;

  return tags.filter((tag) => {
    const newLength = currentLength + tag.text.length;
    if (newLength <= MAX_TAG_TEXT_LENGTH) {
      currentLength = newLength;
      return true;
    }

    return false;
  });
};
