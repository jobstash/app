import {
  useBlockedTermsContext,
  useBlockedTermsStore,
} from '@jobstash/admin/state';

const XXXInfo = () => {
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);
  const options = useBlockedTermsStore((state) => state.options);
  const fetchedBlockedTerms = useBlockedTermsStore(
    (state) => state.fetchedBlockedTerms,
  );

  return (
    <div className="p-12 border border-red-500">
      <pre>
        {JSON.stringify(
          { options, blockedTerms, fetchedBlockedTerms },
          undefined,
          '\t',
        )}
      </pre>
    </div>
  );
};

export default XXXInfo;
