import { useATSClient, useOrgProfileInfo } from '@jobstash/profile/state';

import { ActiveATSForm } from './active-ats-form';
import { Nfts } from './nfts';
import { OrgHighlights } from './org-highlights';

export const ActiveATS = () => {
  const { profileInfoData } = useOrgProfileInfo();
  const orgId = profileInfoData?.orgId;

  const { data } = useATSClient();

  const showPreferences = data && data.id && data.hasWebhooks && data.hasTags;

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <ActiveATSForm orgId={orgId} atsClient={data} />
      </div>

      {showPreferences && (
        <>
          <OrgHighlights atsClient={data} />
          <Nfts atsClient={data} />
        </>
      )}
    </>
  );
};
