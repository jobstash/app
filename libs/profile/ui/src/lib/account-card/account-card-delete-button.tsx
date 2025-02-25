import { Button } from '@heroui/button';

interface Props {
  open: () => void;
}

const AccountCardDeleteButton = ({ open }: Props) => (
  <Button
    fullWidth
    radius="md"
    className="bg-red-500 text-md font-bold"
    size="lg"
    onClick={open}
  >
    Delete Account
  </Button>
);

export default AccountCardDeleteButton;
