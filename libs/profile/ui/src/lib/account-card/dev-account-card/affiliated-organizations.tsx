import { Spinner } from '@nextui-org/react';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { useAffiliatedOrgs } from '@jobstash/auth/state';

import { LogoTitle, Text } from '@jobstash/shared/ui';

export const AffiliatedOrganizations = () => {
  const { data } = useAffiliatedOrgs();

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-2">
        <Text size="lg" fw="bold">
          Affiliated Organizations
        </Text>

        <Text color="dimmed">
          These are the organizations associated with your accounts. Unlock
          premium features designed for organizational impact.
        </Text>
      </div>

      {data ? (
        <div className="flex flex-col gap-6 pl-4">
          {data.map(({ id, name, url, logo, account }) => (
            <LogoTitle
              key={id}
              title={name}
              avatarProps={{
                src: logo ?? getGoogleLogoUrl(url),
                alt: name,
                isRounded: true,
                name,
              }}
              location={account}
            />
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
