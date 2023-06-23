import myzod from 'myzod';

export const organizationSchema = myzod.object(
  {
    id: myzod.string().min(1),
    url: myzod.string().min(1),
    name: myzod.string().min(1),
    orgId: myzod.string().min(1),
    summary: myzod.string().min(1),
    location: myzod.string().min(1),
    description: myzod.string().min(1),
    jobsiteLink: myzod.string().min(1).nullable(),
    github: myzod.string().min(1).nullable(),
    twitter: myzod.string().min(1).nullable(),
    createdTimestamp: myzod.number().nullable(),
    updatedTimestamp: myzod.number().nullable(),

    // Fields conflicting w/ actual data
    headCount: myzod.number().min(1).nullable().optional(), // Should not be optional
    teamSize: myzod.number().min(1).nullable(), // Should be removed - use headCount instead
    discord: myzod.string().nullable(), // Should have min(1) - otherwise null
    telegram: myzod.string().nullable(), // Should have min(1) - otherwise null
    docs: myzod.string().nullable(), // Should have min(1) - otherwise null
  },
  { allowUnknown: true },
);

export const orgPostSchema = myzod.intersection(
  organizationSchema,
  myzod.object({
    // Add more fields here e.g. job count, project count (to be implemented in mw)
  }),
);

export const orgListQueryPageSchema = myzod.object({
  page: myzod.number(),
  count: myzod.number(),
  total: myzod.number(),
  data: myzod.array(organizationSchema),
});
