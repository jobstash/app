import Image from 'next/image';

interface Props {
  filename: 'email' | 'github';
}

export const PickRoleIcon = ({ filename }: Props) => (
  <Image
    src={`/icons/${filename}.svg`}
    alt={filename}
    width="20"
    height="20"
    className="mr-1"
  />
);
