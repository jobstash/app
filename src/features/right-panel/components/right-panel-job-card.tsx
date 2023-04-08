import { createJobTags } from '~/features/jobs/utils';
import { Button, Heading, IconHolder, Text } from '~/shared/components';
import { Job } from '~/shared/core/interfaces';
import { capitalize } from '~/shared/utils';

import { createRightPanelJobDescriptions } from '../utils';

interface Props {
  job: Job;
}

export const RightPanelJobCard = ({ job }: Props) => {
  const { jobTitle } = job;

  const tags = createJobTags(job);
  const descriptions = createRightPanelJobDescriptions(job);

  return (
    <div className="flex flex-col gap-y-5 p-6">
      <div className="flex flex-col items-start gap-y-5">
        <div className="h-10">
          <Heading size="md" fw="semibold">
            {jobTitle}
          </Heading>
        </div>

        <div className="flex h-6 gap-x-4 text-sm">
          {tags.map(({ text, link, iconText }) => (
            <IconHolder key={text} link={link} iconText={iconText}>
              {capitalize(text)}
            </IconHolder>
          ))}
        </div>

        <div>
          <Button variant="primary">Apply for this job</Button>
        </div>
      </div>

      <div className="flex h-8 flex-col justify-center">
        <hr className="border border-white/20" />
      </div>

      {descriptions.map((d) => (
        <div key={d.label} className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            {d.label}
          </Heading>
          <Text color="dimmed">{d.desc}</Text>
        </div>
      ))}
    </div>
  );
};
