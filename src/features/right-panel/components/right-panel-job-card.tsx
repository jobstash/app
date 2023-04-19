import { createJobTags } from '~/features/jobs/utils';
import {
  BookmarkIcon,
  Button,
  CardSet,
  Heading,
  ShareIcon,
  Text,
} from '~/shared/components';
import { JobPost } from '~/shared/core/interfaces';
import { capitalize } from '~/shared/utils';

import { createRightPanelJobDescriptions } from '../utils';

interface Props {
  job: JobPost;
}

export const RightPanelJobCard = ({ job }: Props) => {
  const { jobTitle, jobApplyPageUrl, jobPageUrl } = job;

  const tags = createJobTags(job);
  const descriptions = createRightPanelJobDescriptions(job);

  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.open(jobApplyPageUrl ?? jobPageUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="flex flex-col items-start justify-center gap-y-4">
        <div className="flex h-fit w-full justify-between">
          <Heading size="md" fw="semibold">
            {jobTitle}
          </Heading>
          <div className="flex items-start space-x-4 pl-8">
            <Button isIcon size="sm" variant="translucent">
              <BookmarkIcon />
            </Button>
            <Button isIcon size="sm" variant="translucent">
              <ShareIcon />
            </Button>
          </div>
        </div>

        <div className="flex h-6 gap-x-4 pl-0.5">
          {tags.map(({ text, link, icon }) => (
            <CardSet key={text} link={link} icon={icon}>
              {capitalize(text)}
            </CardSet>
          ))}
        </div>

        <div>
          <Button variant="primary" onClick={onClick}>
            Apply for this job
          </Button>
        </div>
      </div>

      <div className="flex h-8 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      {descriptions.map((d) => (
        <div key={d.label} className="flex flex-col gap-2 self-stretch">
          <Heading size="sm" fw="semibold">
            {d.label}
          </Heading>
          <Text color="dimmed">{d.desc}</Text>
        </div>
      ))}
    </div>
  );
};
