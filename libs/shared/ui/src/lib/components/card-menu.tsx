import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { Menu, PopoverBaseProps } from '@mantine/core';

import Button from '../base/button/button';

interface Props {
  icon?: React.ReactNode;
  children: React.ReactNode;
  position?: PopoverBaseProps['position'];
}

const CardMenu = ({ icon, children, position = 'bottom-end' }: Props) => (
  <Menu
    position={position}
    classNames={{ dropdown: 'bg-dark-gray', item: 'p-2' }}
  >
    <Menu.Target>
      <Button isIcon>
        {icon ?? <EllipsisVerticalIcon className="w-6 h-6 text-white/80" />}
      </Button>
    </Menu.Target>
    <Menu.Dropdown>{children}</Menu.Dropdown>
  </Menu>
);

export default CardMenu;
