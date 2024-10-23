import { Text } from '@jobstash/shared/ui';

export const NotEligibleTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Not Eligible for Job Concierge
      </Text>
      <Text className="text-white/70">
        It looks like your work history or ecosystem participation does not
        qualify you as crypto-native. To become eligible for our Job Concierge
        service, you must have a proven work history in the space, as
        demonstrated by public OSS commits in repos owned by reputable
        organizations, an email associated with a reputable organization, or
        holding an EthGlobal builder-tier pack or a Nouns DAO NFT.
      </Text>
      <Text className="text-white/70">
        Participate in Web3 projects, own a Noun, contribute to decentralized
        applications, attend EthGlobal events, and build your presence in the
        crypto community to enhance your profile.
      </Text>
    </div>
  </div>
);
