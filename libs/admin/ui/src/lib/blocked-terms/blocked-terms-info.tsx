import { useBlockedTermsStore } from '@jobstash/admin/state';

const BlockedTermsInfo = () => {
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);
  const options = useBlockedTermsStore((state) => state.options);
  const fetchedBlockedTerms = useBlockedTermsStore(
    (state) => state.fetchedBlockedTerms,
  );
  const unblockedTerms = useBlockedTermsStore((state) => state.unblockedTerms);

  return (
    <div className="p-12 border border-red-500">
      <pre>
        {JSON.stringify(
          { options, blockedTerms, fetchedBlockedTerms, unblockedTerms },
          undefined,
          '\t',
        )}
      </pre>
    </div>
  );
};

export default BlockedTermsInfo;
