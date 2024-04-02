import { Spinner } from '@nextui-org/spinner';

import { useWorkHistory } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  username: string;
}

export const WorkHistory = ({ username }: Props) => {
  const { data } = useWorkHistory(username);

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner color="white" size="sm" />
      </div>
    );
  }

  return (
    <Text color="dimmed" fw="bold">
      TBD
    </Text>
  );

  //
  // return (
  //   <Chip color="default" radius="sm">
  //     <div className="flex items-center gap-2">
  //       <p>Uniswap</p>
  //       <span role="img" aria-label="organization history">
  //         ✅
  //       </span>
  //       <p>Repos: {7}</p>
  //     </div>
  //   </Chip>
  // );
};
