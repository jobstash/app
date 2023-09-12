import { Technology } from '@jobstash/shared/core';

import { useTechnologiesStore } from '@jobstash/admin/state';

interface Props {
  term: Technology;
}

const ExistingPairedTerm = ({ term }: Props) => {
  const pairedTerms = useTechnologiesStore((state) => state.pairedTerms);

  return <div>ExistingPairedTerm</div>;
};

export default ExistingPairedTerm;
