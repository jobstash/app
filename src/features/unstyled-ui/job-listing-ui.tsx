import clsx from 'clsx';

import { JobListing } from '~/core/interfaces';
import { numFormatter } from '~/core/misc';
import { VoidFn } from '~/core/types';

interface Props {
  jobListing: JobListing;
  isActive: boolean;
  onClick: VoidFn;
}

import Image from 'next/image';

export const JobListingUi = ({ jobListing, isActive, onClick }: Props) => {
  const { title, salary, location, tz, created, details, skills } =
    jobListing.job;

  const strSalary = `${numFormatter.format(salary.min)} - ${numFormatter.format(
    salary.max,
  )} / year`;

  // Skills listed on job-listing (concatenated from all skill-types)
  const allSkills = [...skills.main, ...skills.hasMentor, ...skills.shared];

  return (
    <div
      className={clsx(
        'flex flex-col space-y-6 rounded-3xl border  border-zinc-500 p-8 hover:cursor-pointer hover:bg-zinc-700',
        { 'bg-zinc-800': isActive },
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <h3 className="">{created}</h3>
      </div>

      <div className="flex space-x-4">
        <h3 className="">{details.role.name}</h3>
        <h3 className="">{strSalary}</h3>
        <h3 className="">{location}</h3>
        <h3 className="">Team Size: {details.team.size}</h3>
        <h3 className="">{tz}</h3>
      </div>

      <hr className="h-px border-0 bg-neutral-600" />

      <div className="flex space-x-4">
        {allSkills.map((skill) => (
          <div
            key={skill.name}
            className={clsx('border border-zinc-800 p-2', {
              'border-red-500': skill.isChecked,
            })}
          >
            <h3 className="text-xs">{skill.name.toUpperCase()}</h3>
          </div>
        ))}
      </div>

      <hr className="h-px border-0 bg-neutral-600" />

      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-4">
          <Image
            src={`/org/${jobListing.org.name}.svg`}
            width="40"
            height="40"
            alt="test"
          />
          <h2 className="text-xl font-semibold">{jobListing.org.name}</h2>
        </div>
        <span className="text-sm text-zinc-300">
          Funding: {jobListing.org.fundingDate}
        </span>
      </div>

      <hr className="h-px border-0 bg-neutral-600" />
    </div>
  );
};
