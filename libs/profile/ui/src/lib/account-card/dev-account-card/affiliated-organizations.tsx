import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { SlidersHorizontal as ManageOrgIcon } from 'lucide-react';

import { getGoogleLogoUrl, getPluralText } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import { EditIcon, LeftIcon } from './icons';
import { useAffiliatedOrganizations } from './use-affiliated-organizations';

export const AffiliatedOrganizations = () => {
  const { data, isEditing, toggleEdit, orgCount, hasOrg, getOnManageFn } =
    useAffiliatedOrganizations();

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            {`Affiliated ${getPluralText('Organization', orgCount)}`}
          </Text>
          {hasOrg && (
            <div>
              <Button
                size="sm"
                variant="flat"
                startContent={isEditing ? <LeftIcon /> : <EditIcon />}
                onClick={toggleEdit}
              >
                {isEditing ? 'Done' : 'Manage Affiliations'}
              </Button>
            </div>
          )}
        </div>

        <Text color="dimmed">
          These are the organizations associated with your accounts. Unlock
          premium features designed for organizational impact.
        </Text>
      </div>

      {data ? (
        <div className="flex flex-col gap-6 pl-4">
          {data.map(({ id, name, url, logo, account, slug }) => (
            <div
              key={id}
              className="flex items-center justify-between w-full max-w-[260px]"
            >
              <LogoTitle
                title={name}
                avatarProps={{
                  src: logo ?? getGoogleLogoUrl(url),
                  alt: name,
                  isRounded: true,
                  name,
                }}
                location={account}
              />
              {isEditing && (
                <div>
                  <Tooltip content="Manage Organization">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      onClick={getOnManageFn(slug)}
                    >
                      <ManageOrgIcon className="text-white/80" size={20} />
                    </Button>
                  </Tooltip>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full h-20 items-center justify-center">
          <Spinner size="sm" color="white" />
        </div>
      )}
    </>
  );
};
