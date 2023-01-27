import Image from 'next/image';

import type { Org } from '~/core/interfaces';

interface Props {
  org: Org;
}

export const JobListingOrgInfo = ({ org }: Props) => (
  <div className="flex items-center space-x-8">
    <div className="flex items-center space-x-4">
      <Image src={`/org/${org.name}.svg`} width="40" height="40" alt="test" />
      <h2 className="text-xl font-semibold">{org.name}</h2>
    </div>
    <span className="text-sm text-zinc-300">Funding: {org.fundingDate}</span>
  </div>
);
