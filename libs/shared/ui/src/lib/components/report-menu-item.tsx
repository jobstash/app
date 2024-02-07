import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import { Menu } from '@mantine/core';

import { useReportModal } from '@jobstash/shared/state';

interface Props {
  ui: string;
  other?: string;
}

const ReportMenuItem = ({ ui, other }: Props) => {
  const { open } = useReportModal();

  const onClick = () => {
    open({
      ui,
      url: window?.location.href ?? '',
      ts: Date.now(),
      other: other ?? '',
    });
  };

  return (
    <Menu.Item
      icon={<ExclamationTriangleIcon className="h-4 w-4 text-white" />}
      onClick={onClick}
    >
      Report an issue
    </Menu.Item>
  );
};

export default ReportMenuItem;
