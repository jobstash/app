import { useTechnologiesStore } from '@jobstash/admin/state';

const ExistingPreferredTerms = () => {
  const preferredTerms = useTechnologiesStore((state) => state.preferredTerms);
  const hasPreferredTerms = preferredTerms.length > 0;

  if (!hasPreferredTerms) return <p>No Existing Preferred Terms</p>;

  return <div>ExistingPreferredTerms</div>;
};

export default ExistingPreferredTerms;
