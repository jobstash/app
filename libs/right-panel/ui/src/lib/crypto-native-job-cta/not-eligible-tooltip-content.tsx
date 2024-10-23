import { Text } from '@jobstash/shared/ui';

export const NotEligibleTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Not Eligible for Job Concierge
      </Text>
      <Text className="text-white/70">
        It looks like your work history or your ecosystem participation does not
        qualify you as crypto native. To become eligible for our Job Concierge
        service, you must have previous work history in the space as proven by
        public OSS commits in repos owned by reputable organizations, an email
        that associates you with a reputable organization, or be a holder of an
        EthGlobal pack starting from the builder tier.
      </Text>
      <Text className="text-white/70">
        Participate in Web3 projects, contribute to decentralized applications,
        attend EthGlobal events, and build your presence in the crypto community
        to enhance your profile.
      </Text>
    </div>
  </div>
);
