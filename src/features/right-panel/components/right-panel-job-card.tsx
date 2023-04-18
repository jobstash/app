import { createJobTags } from '~/features/jobs/utils';
import { Button, CardSet, Heading, Text } from '~/shared/components';
import { JobPost } from '~/shared/core/interfaces';
import { capitalize } from '~/shared/utils';

import { createRightPanelJobDescriptions } from '../utils';

interface Props {
  job: JobPost;
}

export const RightPanelJobCard = ({ job }: Props) => {
  const { jobTitle } = job;

  const tags = createJobTags(job);
  const descriptions = createRightPanelJobDescriptions(job);

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="flex flex-col items-start justify-center gap-y-4">
        <div className="h-fit">
          <Heading size="md" fw="semibold">
            {jobTitle}
          </Heading>
        </div>

        <div className="flex h-6 gap-x-4 pl-0.5">
          {tags.map(({ text, link, icon }) => (
            <CardSet key={text} link={link} icon={icon}>
              {capitalize(text)}
            </CardSet>
          ))}
        </div>

        <div>
          <Button variant="primary">Apply for this job</Button>
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
