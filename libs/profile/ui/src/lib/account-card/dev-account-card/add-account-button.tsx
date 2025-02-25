import { Button } from '@heroui/button';

interface Props {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const AddAccountButton = ({ label, icon, onClick }: Props) => (
  <div className="w-fit relative min-h-16 flex items-end">
    <Button size="sm" startContent={icon} onClick={onClick}>
      {label}
    </Button>
  </div>
);
