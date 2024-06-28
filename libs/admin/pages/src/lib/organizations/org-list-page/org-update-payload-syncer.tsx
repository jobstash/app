import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { ORG_LIST_UNDO_EVENT } from '@jobstash/admin/core';
import { makeOptional } from '@jobstash/shared/utils';

import { orgEditRowPayloadAtom } from '@jobstash/admin/state';

import { useUpdateOrg } from './use-update-org';

export const OrgUpdatePayloadSyncer = () => {
  const [dataPayload, setDataPayload] = useAtom(orgEditRowPayloadAtom);
  const { mutate } = useUpdateOrg();

  useEffect(() => {
    if (dataPayload) {
      const projects = dataPayload.projects.map((p) => p.id);
      const {
        orgId,
        name,
        logoUrl,
        description,
        summary,
        headcountEstimate,
        location,
        website,
        twitter,
        github,
        discord,
        docs,
        telegram,
        aliases,
        grant,
        community,
        jobsite,
        detectedJobsite,
      } = dataPayload;

      mutate(
        {
          orgId,
          payload: {
            logoUrl: makeOptional(logoUrl),
            name,
            description: makeOptional(description),
            summary: makeOptional(summary),
            headcountEstimate: makeOptional(headcountEstimate),
            location: makeOptional(location),
            aliases,
            website,
            twitter,
            github,
            discord,
            docs,
            telegram,
            grants: grant,
            communities: community,
            projects,
            jobsites: jobsite,
            detectedJobsites: detectedJobsite,
          },
        },
        {
          onError() {
            // Revert cell content if mutation fails
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent(ORG_LIST_UNDO_EVENT));
            }
          },
          onSettled() {
            // Reset atom for future use
            setDataPayload(null);
          },
        },
      );
    }
  }, [dataPayload, mutate, setDataPayload]);

  return null;
};
