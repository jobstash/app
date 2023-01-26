import Image from 'next/image';

import clsx from 'clsx';

import type { Job } from '~/core/interfaces';
import { numFormatter } from '~/core/misc';
import { VoidFn } from '~/core/types';

interface Props {
  job: Job;
  isActive: boolean;
  onClick: VoidFn;
}

/** UNSTYLED */
const JobCard = ({ job, isActive, onClick }: Props) => (
  <div
    key={job.id}
    className={clsx(
      'flex flex-col space-y-6 rounded-3xl border  border-zinc-500 p-8 hover:cursor-pointer hover:bg-zinc-800',
      { 'bg-zinc-800': isActive },
    )}
    onClick={onClick}
  >
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">{job.title}</h1>

      <h3 className="">{job.created}</h3>
    </div>

    <div className="flex space-x-4">
      <h3 className="">{job.role}</h3>
      <h3 className="">{`${numFormatter.format(
        job.salary.min,
      )} - ${numFormatter.format(job.salary.max)} / year`}</h3>
      <h3 className="">{job.strat}</h3>
      <h3 className="">Team Size: {job.teamSize}</h3>
      <h3 className="">{job.tz}</h3>
    </div>

    <hr className="h-px border-0 bg-neutral-600" />

    <div className="flex space-x-8">
      {job.tags.map((tag) => (
        <div key={tag.name} className="border border-zinc-600 p-2">
          <h3 className="text-xs">{tag.name.toUpperCase()}</h3>
        </div>
      ))}
    </div>

    <hr className="h-px border-0 bg-neutral-600" />

    <div className="flex items-center space-x-4">
      <div className="relative h-12 w-12">
        <Image
          fill
          src={job.orgAvatar}
          className="rounded-xl"
          alt={`${job.org} logo`}
        />
      </div>
      <h2 className="text-xl font-semibold">{job.org}</h2>
    </div>
  </div>
);

export default JobCard;
