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
      const website = dataPayload.websiteStatus.flatMap((s) => s.url);
      const twitter = dataPayload.twitterStatus.flatMap((s) => s.url);
      const github = dataPayload.githubStatus.flatMap((s) => s.url);
      const discord = dataPayload.discordStatus.flatMap((s) => s.url);
      const docs = dataPayload.docsStatus.flatMap((s) => s.url);
      const telegram = dataPayload.telegramStatus.flatMap((s) => s.url);
      const projects = dataPayload.projects.map((p) => p.id);
      const {
        orgId,
        name,
        logoUrl,
        description,
        summary,
        headcountEstimate,
        location,
        aliases,
        grant,
        community,
        jobsites,
        detectedJobsites,
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
            jobsites,
            detectedJobsites,
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
