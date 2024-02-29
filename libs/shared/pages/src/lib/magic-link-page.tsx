import { Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  isOrg: boolean;
  isError: boolean;
}

export const MagicLinkPage = ({ isOrg, isError }: Props) => (
  <div className="w-full lg:pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-2">
        <Text size="lg" fw="bold">
          {isError
            ? 'Something went wrong :('
            : 'You have connected your email!'}
        </Text>
        <Text color="dimmed">
          {isError || isOrg
            ? 'Please reload this page.'
            : 'Please close this tab now.'}
        </Text>
      </div>
    </div>
  </div>
);
