import { useATSClient } from '@jobstash/organizations/state';

import { ActiveATSForm } from './active-ats-form';
import { Nfts } from './nfts';
import { OrgHighlights } from './org-highlights';

export const ActiveATS = () => {
  const { data } = useATSClient();

  const showPreferences = data && data.id && data.hasWebhooks && data.hasTags;

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <ActiveATSForm orgId="TODO" atsClient={data} />
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
