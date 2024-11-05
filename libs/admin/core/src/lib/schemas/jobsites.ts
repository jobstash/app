import myzod, { Infer } from 'myzod';

export const orgJobsitePayloadSchema = myzod.object({
  orgId: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

export type OrgJobsitePayload = Infer<typeof orgJobsitePayloadSchema>;

export const projectJobsitePayloadSchema = myzod.object({
  id: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

export type ProjectJobsitePayload = Infer<typeof projectJobsitePayloadSchema>;
