import { Button } from '@nextui-org/react';
import { FilePenLine } from 'lucide-react';

export const OrgJobEditButton = () => (
  <Button
    size="sm"
    className="bg-white/10 font-bold"
    startContent={<FilePenLine className="h-3.5 w-3.5" />}
  >
    Edit
  </Button>
);
