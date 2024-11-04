import { Spinner } from '@nextui-org/react';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import { RequestAccessModal } from './request-access-modal';
import { useAffiliatedOrganizations } from './use-affiliated-organizations';

const AFFILIATED_ORG_TITLE = 'Affiliated Organizations';
const ADD_AFFILIATED_ORG_TITLE = 'Elevate to Expert Status';
const AFFILIATED_DESCRIPTION =
  'These are the organizations associated with your accounts. Displaying your affiliations helps build credibility within your industry.';

const ADD_AFFILIATED_DESCRIPTION =
  "You're on your way to being recognized as an expert. Continue connecting your professional accounts to affiliate with organizations. The more accounts you link, the more you'll be perceived as an expert when collaborating with different organizations.";

export const AffiliatedOrganizations = () => {
  const { data, hasOrg, isRefetching } = useAffiliatedOrganizations();

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
          <div className="flex items-center gap-4">
            <Text size="lg" fw="bold">
              {title}
            </Text>
            {isRefetching && <Spinner size="sm" color="white" />}
          </div>
        </div>

        <Text color="dimmed">{description}</Text>
      </div>

      {hasOrg && (
        <div className="flex flex-col gap-6 pl-4">
          {data.map((org) => (
            <div key={org.id} className="flex items-center gap-8">
              <LogoTitle
                title={org.name}
                avatarProps={{
                  src: org.logo ?? getGoogleLogoUrl(org.url),
                  alt: org.name,
                  isRounded: true,
                  name: org.name,
                }}
                location={org.account}
              />

              <RequestAccessModal org={org} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
