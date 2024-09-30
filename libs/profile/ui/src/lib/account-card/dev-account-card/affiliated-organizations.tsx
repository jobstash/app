import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { SlidersHorizontal as ManageOrgIcon } from 'lucide-react';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import { EditIcon, LeftIcon } from './icons';
import { useAffiliatedOrganizations } from './use-affiliated-organizations';

const AFFILIATED_ORG_TITLE = 'Affiliated Organizations';
const ADD_AFFILIATED_ORG_TITLE = 'Elevate to Expert Status';
const AFFILIATED_DESCRIPTION =
  'These are the organizations associated with your accounts. Displaying your affiliations helps build credibility within your industry.';
// 'These are the organizations associated with your accounts. Unlock premium features designed for organizational impact.';
const ADD_AFFILIATED_DESCRIPTION =
  "You're on your way to being recognized as an expert. Continue connecting your professional accounts to affiliate with organizations. The more accounts you link, the more you'll be perceived as an expert when collaborating with different organizations.";

export const AffiliatedOrganizations = () => {
  const { data, isEditing, toggleEdit, hasOrg, getOnManageFn } =
    useAffiliatedOrganizations();

  if (!data)
    return (
      <div className="flex items-center justify-center w-full h-40">
        <Spinner size="sm" color="white" />
      </div>
    );

  const title = hasOrg ? AFFILIATED_ORG_TITLE : ADD_AFFILIATED_ORG_TITLE;
  const description = hasOrg
    ? AFFILIATED_DESCRIPTION
    : ADD_AFFILIATED_DESCRIPTION;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            {title}
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

        <Text color="dimmed">{description}</Text>
      </div>

      {hasOrg && (
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
      )}
    </>
  );
};
