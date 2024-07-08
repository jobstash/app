import { Chip } from '@nextui-org/chip';

interface Props {
  value: boolean;
}

export const BooleanCell = ({ value }: Props) => {
  const color = value ? 'success' : 'default';
  const text = value ? 'Yes' : 'No';
  return <Chip color={color}>{text}</Chip>;
};
