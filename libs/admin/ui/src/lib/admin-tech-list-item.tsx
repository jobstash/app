import { Button, Text } from '@jobstash/shared/ui';

import RemoveIcon from './icons/remove-icon';

interface Props {
  tech: string;
  onRemove: (tech: string) => void;
  isDisabled?: boolean;
}

const AdminTechListItem = ({ tech, onRemove, isDisabled }: Props) => (
  // <div className="w-fit">
  //   <Button right={<RemoveIcon />}>Javascript</Button>
  // </div>

  <div className="flex items-center bg-dark-gray px-2 pl-4 py-1 rounded-lg gap-2">
    <div>
      <Text>{tech}</Text>
    </div>
    <div>
      <Button
        isIcon
        variant="translucent"
        size="sm"
        className="opacity-90"
        isDisabled={isDisabled}
        onClick={() => onRemove(tech)}
      >
        <RemoveIcon />
      </Button>
    </div>
  </div>
);

export default AdminTechListItem;
