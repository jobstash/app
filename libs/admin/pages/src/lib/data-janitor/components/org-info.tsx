import { Button, Divider, Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { ListStart, RefreshCcw, Trash2 } from 'lucide-react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { Heading, LogoTitle } from '@jobstash/shared/ui';

import { selectedOrgAtom } from '../core/atoms';

import { OrgProjectInfo } from './org-project-info';

export const OrgInfo = () => {
  const [org, setOrg] = useAtom(selectedOrgAtom);

  if (!org) return null;

  const { name, website, logoUrl, location, projects } = org;

  const reset = () => setOrg(null);

  return (
    <>
      <div className="flex items-center gap-8">
        <LogoTitle
          size="lg"
          title={name}
          location={location}
          avatarProps={{
            alt: name,
            src: getLogoUrl(website.length > 0 ? website[0] : null, logoUrl),
          }}
        />
        <Tooltip content="Choose another organization">
          <Button isIconOnly size="sm" onClick={reset}>
            <ListStart className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>

      <div className="flex gap-4 items-center ">
        <Button
          size="sm"
          className="font-bold"
          startContent={<RefreshCcw className="h-4 w-4 -mt-0.5" />}
        >
          Convert to Project
        </Button>
        <Button
          size="sm"
          className="bg-red-700 font-bold"
          startContent={<Trash2 className="h-4 w-4 -mt-0.5" />}
        >
          Delete
        </Button>
      </div>

      <div className="space-y-8">
        {projects.length > 0 && (
          <>
            <div className="pt-4">
              <Divider />
            </div>

            <Heading size="md">Linked Projects:</Heading>

            {projects.map(({ id, name }) => (
              <OrgProjectInfo key={id} id={id} name={name} />
            ))}

            <Button size="sm" className="font-bold">
              Link Another Project
            </Button>
          </>
        )}
      </div>
    </>
  );
};
