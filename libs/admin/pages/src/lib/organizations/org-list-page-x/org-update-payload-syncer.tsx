import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { ORG_LIST_UNDO_EVENT } from '@jobstash/admin/core';
import { makeOptional } from '@jobstash/shared/utils';

import { orgUpdateRowPayloadAtom } from '@jobstash/admin/state';

import { useUpdateOrg } from './use-update-org';

export const OrgUpdatePayloadSyncer = () => {
  const [dataPayload, setDataPayload] = useAtom(orgUpdateRowPayloadAtom);
  const { mutate } = useUpdateOrg();

  useEffect(() => {
    if (dataPayload) {
      const website = dataPayload.websiteStatus.flatMap((s) => s.url);
      const twitter = dataPayload.twitterStatus.flatMap((s) => s.url);
      const github = dataPayload.githubStatus.flatMap((s) => s.url);
      const discord = dataPayload.discordStatus.flatMap((s) => s.url);
      const docs = dataPayload.docsStatus.flatMap((s) => s.url);
      const telegram = dataPayload.telegramStatus.flatMap((s) => s.url);
      const projects = dataPayload.projects.map((p) => p.id);

      mutate(
        {
          orgId: dataPayload.orgId,
          payload: {
            logoUrl: makeOptional(dataPayload.logoUrl),
            name: dataPayload.name,
            description: makeOptional(dataPayload.description),
            summary: makeOptional(dataPayload.summary),
            headcountEstimate: makeOptional(dataPayload.headcountEstimate),
            location: makeOptional(dataPayload.location),
            aliases: dataPayload.aliases,
            website,
            twitter,
            github,
            discord,
            docs,
            telegram,
            grants: dataPayload.grant,
            communities: dataPayload.community,
            projects,
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
