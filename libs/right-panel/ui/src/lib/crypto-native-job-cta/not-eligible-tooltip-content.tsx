import { Text } from '@jobstash/shared/ui';

export const NotEligibleTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Not Eligible for Fast-Track
      </Text>
      <Text className="text-white/70">
        It looks like your account is not recognized as crypto-native. To become
        eligible for our Fast-Track application process, consider getting more
        involved in the Web3 space.
      </Text>
      <Text className="text-white/70">
        Participate in Web3 projects, contribute to decentralized applications,
        and build your presence in the crypto community to enhance your profile.
      </Text>
    </div>
  </div>
);
