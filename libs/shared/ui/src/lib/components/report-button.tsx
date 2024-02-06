import {
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';
import { Menu } from '@mantine/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useReportModal } from '@jobstash/shared/state';

import Button from '../base/button/button';

interface Props {
  ui: string;
}

const ReportButton = ({ ui }: Props) => {
  const { open } = useReportModal();

  const { role, flow, address, isConnected, isSignedIn } = useAuthContext();

  const onClick = () => {
    open({
      ui,
      url: 'TODO',
      user: { role, flow, address, isConnected, isSignedIn },
      ts: Date.now(),
    });
  };

  return (
    <Menu
      position="bottom-end"
      classNames={{ dropdown: 'bg-dark-gray', item: 'p-2' }}
    >
      <Menu.Target>
        <Button isIcon>
          <EllipsisVerticalIcon className="w-6 h-6 text-white/80" />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<ExclamationTriangleIcon className="h-4 w-4 text-white" />}
          onClick={onClick}
        >
          Report an issue
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ReportButton;
