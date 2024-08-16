import { Text } from '@jobstash/shared/ui';

export const AnonTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Check if you qualify as Expert
      </Text>
      <Text className="text-white/70">
        Qualifying candidates get free personalized advice on how to
        successfully apply for this job, and have us advocate for you with the
        hiring manager. To find out if you are eligible, connect your wallet and
        your github account, or verify your current work email, we will check
        your work history and automatically approve you if you qualify.
      </Text>
      <Text className="text-white/70">
        Qualification criteria: You must have verified OSS contributions in a
        repo which is owned by one of the organizations we track, or have a
        verified work email from one of the organizations we track. We also
        Hackathon NFT Packs issued by EthGlobal, and accept any tier above and
        including the Pioneer tier.
      </Text>
    </div>
  </div>
);
