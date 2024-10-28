import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { ORG_LIST_UNDO_EVENT } from '@jobstash/admin/core';
import { makeNullable } from '@jobstash/shared/utils';

import { orgEditRowPayloadAtom, useUpdateOrg } from '@jobstash/admin/state';

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
        websites,
        twitters,
        githubs,
        discords,
        docs,
        telegrams,
        aliases,
        grants,
        communities,
        jobsites,
        detectedJobsites,
      } = dataPayload;

      mutate(
        {
          orgId,
          name,
          location: makeNullable(location),
          logoUrl,
          description: makeNullable(description),
          summary: makeNullable(summary),
          headcountEstimate,
          websites,
          aliases,
          twitters,
          githubs,
          discords,
          docs,
          telegrams,
          grants,
          communities,
          jobsites,
          detectedJobsites,
          projects,
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
