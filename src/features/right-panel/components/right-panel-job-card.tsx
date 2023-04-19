import { createJobTags } from '~/features/jobs/utils';
import {
  Button,
  CardSet,
  Heading,
  TechWrapper,
  Text,
} from '~/shared/components';
import { JobPost, Technology } from '~/shared/core/interfaces';
import { capitalize } from '~/shared/utils';

import { createRightPanelJobDescriptions } from '../utils';

interface Props {
  job: JobPost;
  technologies: Technology[];
}

export const RightPanelJobCard = ({ job, technologies }: Props) => {
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

      <div className="flex h-8 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Technologies
          </Heading>
          <Text color="dimmed">
            Uncover the technical skills and tools employed by the company, and
            gain insight into the technologies that drive their success.
          </Text>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <TechWrapper key={tech.id} id={tech.id}>
            {tech.name}
          </TechWrapper>
        ))}
      </div>

      {/* <Button variant="primary">Explore Project</Button> */}
    </div>
  );
};
