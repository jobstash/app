import { useRouter } from 'next/router';

import { Button } from '@jobstash/shared/ui';

interface Props {
  tabs: { label: string; path: string }[];
}

const AdminTabs = ({ tabs }: Props) => {
  const { asPath, push } = useRouter();

  const redirect = (path: string) => push(path, undefined, { shallow: true });

  return (
    <div className="flex gap-2">
      {tabs.map(({ label, path }) => (
        <Button
          key={label}
          variant="outline"
          isActive={asPath === path}
          onClick={() => redirect(path)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default AdminTabs;
