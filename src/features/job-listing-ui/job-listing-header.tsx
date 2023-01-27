import type { Job } from '~/core/interfaces';
import { formatSalary } from '~/utils/format-salary';

interface Props {
  job: Job;
}

export const JobListingHeader = ({ job }: Props) => {
  const { title, salary, location, tz, created, details, skills } = job;

  const strSalary = formatSalary(salary);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <h3 className="">{created}</h3>
      </div>

      <div className="flex space-x-4 text-sm">
        <h3 className="">{details.role.name}</h3>
        <h3 className="">{strSalary}</h3>
        <h3 className="">{location}</h3>
        <h3 className="">Team Size: {details.team.size}</h3>
        <h3 className="">{tz}</h3>
      </div>

      <hr className="h-px border-0 bg-neutral-600" />
    </>
  );
};
