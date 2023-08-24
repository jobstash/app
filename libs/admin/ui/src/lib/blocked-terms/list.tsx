import { useBlockedTermsStore } from '@jobstash/admin/state';

import { Heading, Text } from '@jobstash/shared/ui';

import BlockedTerm from './blocked-term';

const BlockedTermsList = () => {
  const blockedTerms = useBlockedTermsStore((state) => state.blockedTerms);

  return (
    <div className="flex items-start gap-6">
      <div className="w-1/3 flex justify-end">
        <Heading size="sm" fw="semibold">
          List of Blocked Terms
        </Heading>
      </div>
      <div className="w-full gap-8">
        <div className="flex gap-4 items-center flex-wrap">
          {blockedTerms.length > 1 ? (
            blockedTerms.map((tech) => (
              <BlockedTerm key={tech} tech={tech} onRemove={() => null} />
            ))
          ) : (
            <Text color="dimmed" size="lg">
              No blocked terms yet
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockedTermsList;
