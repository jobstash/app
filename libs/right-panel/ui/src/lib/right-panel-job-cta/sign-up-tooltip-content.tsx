import { Text } from '@jobstash/shared/ui';

export const SignUpTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Get Noticed by Hiring Managers & More
      </Text>
      <ul className="space-y-1 list-disc list-outside pl-4">
        <li>
          <Text className="text-white/70">
            Mark yourself as available in your profile & hiring managers will
            reach out directly
          </Text>
        </li>
        <li>
          <Text className="text-white/70">
            Bookmark jobs for later consultation
          </Text>
        </li>
        <li>
          <Text className="text-white/70">
            Get a customized stream of jobs based on your unique skillset
          </Text>
        </li>
      </ul>
    </div>
  </div>
);
