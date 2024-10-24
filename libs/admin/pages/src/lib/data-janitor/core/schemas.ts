import { T } from '@privy-io/react-auth/dist/dts/types';
import myzod, { Infer } from 'myzod';

import { ProjectDetails } from '@jobstash/projects/core';
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

export const managedOrgPayloadSchema = myzod.intersection(
  myzod.omit(managedOrgSchema, ['projects']),
  myzod.object({
    projects: myzod.array(myzod.string()),
  }),
);

export type ManagedOrgPayload = Infer<typeof managedOrgPayloadSchema>;

type Payload = Omit<ManagedOrg, 'projects'> & { projects: string[] };

const parseList = (value: string) =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export const formStateToPayload = (
  formState: ManagedOrgFormState,
): Payload => ({
  orgId: formState.orgId,
  name: formState.name,
  location: formState.location,
  logoUrl: formState.logoUrl || null,
  description: formState.description,
  summary: formState.summary,
  headcountEstimate: Number(formState.headcountEstimate),
  aliases: parseList(formState.aliases),
  websites: parseList(formState.website),
  discords: parseList(formState.discord),
  telegrams: parseList(formState.telegram),
  githubs: parseList(formState.github),
  docs: parseList(formState.docs),
  twitters: parseList(formState.twitter),
  grants: parseList(formState.grants),
  communities: parseList(formState.communities),
  jobsites: JSON.parse(formState.jobsites),
  detectedJobsites: JSON.parse(formState.detectedJobsites),
  projects: parseList(formState.projects),
});

export const managedOrgResponseSchema = myzod.intersection(
  messageResponseSchema,
  myzod.object({
    data: managedOrgSchema,
  }),
);

export type ManagedOrgResponse = Infer<typeof managedOrgResponseSchema>;

export const updateProjectPayloadSchema = myzod.object({
  name: myzod.string(),
  description: myzod.string().nullable(),
  category: myzod.string().nullable(),
  logo: myzod.string().nullable(),
  isMainnet: myzod.boolean().nullable(),
  tvl: myzod.number().nullable(),
  monthlyFees: myzod.number().nullable(),
  monthlyVolume: myzod.number().nullable(),
  monthlyRevenue: myzod.number().nullable(),
  monthlyActiveUsers: myzod.number().nullable(),
  website: myzod.string().nullable(),
  docs: myzod.string().nullable(),
  twitter: myzod.string().nullable(),
  discord: myzod.string().nullable(),
  github: myzod.string().nullable(),
  telegram: myzod.string().nullable(),
  tokenAddress: myzod.string().nullable(),
  tokenSymbol: myzod.string().nullable(),
  defiLlamaId: myzod.string().nullable(),
  defiLlamaSlug: myzod.string().nullable(),
  defiLlamaParent: myzod.string().nullable(),
});

export type UpdateProjectPayload = Infer<typeof updateProjectPayloadSchema>;

const nullable = <T>(value: T) => value || null;

export const dataToProjectPayload = (
  data: ProjectDetails,
): UpdateProjectPayload => ({
  name: data.name,
  description: nullable(data.description),
  category: data.category,
  logo: nullable(data.logo),
  isMainnet: nullable(data.isMainnet),
  tvl: nullable(data.tvl),
  monthlyFees: nullable(data.monthlyFees),
  monthlyVolume: nullable(data.monthlyVolume),
  monthlyRevenue: nullable(data.monthlyRevenue),
  monthlyActiveUsers: nullable(data.monthlyActiveUsers),
  website: nullable(data.website),
  docs: nullable(data.docs),
  twitter: nullable(data.twitter),
  discord: nullable(data.discord),
  github: nullable(data.github),
  telegram: nullable(data.telegram),
  tokenAddress: null,
  tokenSymbol: nullable(data.tokenSymbol),
  defiLlamaId: nullable(data.defiLlamaId),
  defiLlamaSlug: nullable(data.defiLlamaSlug),
  defiLlamaParent: nullable(data.defiLlamaParent),
});

export const sanitizeProjectFormState = (
  formState: UpdateProjectPayload,
): UpdateProjectPayload => ({
  ...formState,
  isMainnet: nullable(formState.isMainnet),
});
