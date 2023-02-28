import { createJobTags } from '~/features/jobs/utils';
import { Button, IconHolder } from '~/shared/components';
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
    <div className="p-6">
      <h2 className="text-xl font-medium">{jobTitle}</h2>

      <div className="flex space-x-8 border-b border-white/5 pt-3 pb-4 text-sm">
        {tags.map(({ text, link, iconText }) => (
          <IconHolder key={text} link={link} iconText={iconText}>
            {capitalize(text)}
          </IconHolder>
        ))}
      </div>

      <div className="flex flex-wrap space-x-2 border-b border-white/20 pb-6">
        <Button>Apply for this job</Button>
      </div>

      <div className="space-y-4 pt-4">
        {descriptions.map((d) => (
          <div key={d.label} className="">
            <p className="text-md text-white">{d.label}</p>
            <p className="text-sm text-sidebarTitle">{d.desc}</p>
          </div>
        ))}
      </div>

      {/** Note: Still waiting for backend/middleware to finalize project hardskills */}
      {/* <div>
              <div>
                <p>Hard Skills</p>
                <p>These are technical skills required for the job</p>
              </div>
              {Object.entries(skills).map(([k, v], i) => (
                <div key={k}>
                  <span>{hardSkillTitles[i]}</span>
                  <p>{JSON.stringify(v)}</p>
                </div>
              ))}
            </div> */}
    </div>
  );
};
