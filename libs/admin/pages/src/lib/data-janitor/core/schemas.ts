import myzod, { Infer } from 'myzod';

import { messageResponseSchema } from '@jobstash/shared/core';

export const jobsitesSchema = myzod.array(
  myzod.object({
    id: myzod.string(),
    url: myzod.string(),
    type: myzod.string(),
  }),
);

export const managedOrgSchema = myzod
  .object({
    orgId: myzod.string(),
    name: myzod.string().nullable(),
    location: myzod.string().nullable(),
    logoUrl: myzod.string().nullable(),
    description: myzod.string().nullable(),
    summary: myzod.string().nullable(),
    headcountEstimate: myzod.number().nullable(),
    websites: myzod.array(myzod.string()),
    aliases: myzod.array(myzod.string()),
    twitters: myzod.array(myzod.string()),
    githubs: myzod.array(myzod.string()),
    discords: myzod.array(myzod.string()),
    docs: myzod.array(myzod.string()),
    telegrams: myzod.array(myzod.string()),
    grants: myzod.array(myzod.string()),
    communities: myzod.array(myzod.string()),
    jobsites: jobsitesSchema,
    detectedJobsites: jobsitesSchema,
    projects: myzod.array(
      myzod
        .object({
          id: myzod.string(),
          name: myzod.string(),
        })
        .allowUnknownKeys(true),
    ),
    //
    // altName: myzod.string().nullable(),
    // rawWebsites: myzod.array(myzod.string()),
  })
  .allowUnknownKeys(true);

export type ManagedOrg = Infer<typeof managedOrgSchema>;

export const managedOrgFormStateSchema = myzod.object({
  orgId: myzod.string(),
  name: myzod.string(),
  location: myzod.string(),
  logoUrl: myzod.string(),
  description: myzod.string(),
  summary: myzod.string(),
  headcountEstimate: myzod.string(),
  website: myzod.string(),
  aliases: myzod.string(),
  twitter: myzod.string(),
  github: myzod.string(),
  discord: myzod.string(),
  docs: myzod.string(),
  telegram: myzod.string(),
  grants: myzod.string(),
  communities: myzod.string(),
  jobsites: myzod.string(),
  detectedJobsites: myzod.string(),
  projects: myzod.string(),
  //
  // altName: myzod.string(),
  // rawWebsite: myzod.string(),
});

export type ManagedOrgFormState = Infer<typeof managedOrgFormStateSchema>;

export const dataToFormState = (data: ManagedOrg): ManagedOrgFormState => ({
  orgId: data.orgId,
  name: data.name ?? '',
  location: data.location ?? '',
  logoUrl: data.logoUrl ?? '',
  description: data.description ?? '',
  summary: data.summary ?? '',
  headcountEstimate: data.headcountEstimate?.toString() ?? '',
  aliases: data.aliases.join(', '),
  website: data.websites.join(', '),
  discord: data.discords.join(', '),
  telegram: data.telegrams.join(', '),
  github: data.githubs.join(', '),
  docs: data.docs.join(', '),
  twitter: data.twitters.join(', '),
  grants: data.grants.join(', '),
  communities: data.communities.join(', '),
  jobsites: JSON.stringify(data.jobsites, undefined, 2),
  detectedJobsites: JSON.stringify(data.detectedJobsites, undefined, 2),
  projects: data.projects.map((p) => p.id).join(', '),
  //
  // altName: data.altName ?? '',
  // rawWebsite: data.rawWebsites.join(', '),
});

export const formStateToData = (
  formState: ManagedOrgFormState,
  projects: ManagedOrg['projects'],
): ManagedOrg => ({
  orgId: formState.orgId,
  name: formState.name,
  location: formState.location,
  logoUrl: formState.logoUrl || null,
  description: formState.description,
  summary: formState.summary,
  headcountEstimate: Number(formState.headcountEstimate),
  aliases: formState.aliases
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  websites: formState.website
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  discords: formState.discord
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  telegrams: formState.telegram
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  githubs: formState.github
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  docs: formState.docs
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  twitters: formState.twitter
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  grants: formState.grants
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  communities: formState.communities
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  jobsites: JSON.parse(formState.jobsites),
  detectedJobsites: JSON.parse(formState.jobsites),
  projects: (() => {
    const projectIds = new Set(
      formState.projects
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    );

    return projects.filter((p) => projectIds.has(p.id));
  })(),
  //
  // altName: formState.altName,
  // rawWebsites: formState.rawWebsite
  //   .split(',')
  //   .map((s) => s.trim())
  //   .filter(Boolean),
});

export const managedOrgResponseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: managedOrgSchema,
  }),
);

export type ManagedOrgResponse = Infer<typeof managedOrgResponseSchema>;
