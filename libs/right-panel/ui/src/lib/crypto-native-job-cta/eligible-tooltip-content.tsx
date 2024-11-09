import { Text } from '@jobstash/shared/ui';

export const EligibleTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Get Expert Apply Link
      </Text>
      <Text className="text-white/70">
        Congratulations! You are eligible to apply as an expert! Upon filling
        out the application form, you will be introduced to the organization
        using a different process which will put you at a significant advantage
        over other applicants.
      </Text>
      <Text className="text-white/70">
        We take a lot of pride in supporting builders like you by giving you
        priority access to some of the best opportunities in the space. Your
        application through our partners allows us to fund our operations.
      </Text>
    </div>
  </div>
);
