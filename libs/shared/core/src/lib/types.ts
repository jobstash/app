import type { ReactNode } from 'react';

import { type Infer } from 'myzod';

import { ROUTE_SECTION } from './constants';
import {
  allTagsResponseSchema,
  auditSchema,
  categorySchema,
  chainSchema,
  fundingRoundSchema,
  grantFundingSchema,
  hackSchema,
  investorSchema,
  jobCardSetSchema,
  jobInfoSchema,
  jobPostSchema,
  jobsiteSchema,
  messageResponseSchema,
  mwMessageResponseSchema,
  orgInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  reportPayloadSchema,
  repositoryInfoSchema,
  tagSchema,
  undefinedSchema,
} from './schemas';

export interface TagElement {
  id: string;
  text: string;
  icon?: ReactNode;
  link?: string;
  showLinkIcon?: boolean;
  asLink?: boolean;
}

export type Undefined = Infer<typeof undefinedSchema>;

export type MessageResponse = Infer<typeof messageResponseSchema>;

export type Tag = Infer<typeof tagSchema>;
export type AllTagsResponse = Infer<typeof allTagsResponseSchema>;

export type Investor = Infer<typeof investorSchema>;

export type FundingRound = Infer<typeof fundingRoundSchema>;

export type GrantFunding = Infer<typeof grantFundingSchema>;

export type Category = Infer<typeof categorySchema>;

export type Chain = Infer<typeof chainSchema>;

export type Hack = Infer<typeof hackSchema>;

export type Audit = Infer<typeof auditSchema>;

export type JobCardSet = Infer<typeof jobCardSetSchema>;
export type JobInfo = Infer<typeof jobInfoSchema>;
export type OrgInfo = Infer<typeof orgInfoSchema>;
export type ProjectInfo = Infer<typeof projectInfoSchema>;
export type ProjectMoreInfo = Infer<typeof projectMoreInfoSchema>;
export type RepositoryInfo = Infer<typeof repositoryInfoSchema>;

export type MwMessageResponse = Infer<typeof mwMessageResponseSchema>;

export type RouteSection = typeof ROUTE_SECTION[keyof typeof ROUTE_SECTION];

export type NotFoundInfo = {
  link: string;
  title: string;
  message: string;
  buttonText: string;
};

export type ReportPayload = Infer<typeof reportPayloadSchema>;

export type MwVersionCtx = {
  isReady: boolean;
  mwVersion: string | null;
};

export type JobsRouteSection =
  | typeof ROUTE_SECTION.JOBS
  | typeof ROUTE_SECTION.JOBS_FOR_EXPERTS;

export type Jobsite = Infer<typeof jobsiteSchema>;

export type JobPost = Infer<typeof jobPostSchema>;

export interface JobPostPageSharedProps {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
}

export interface Socials {
  github: string | null;
  twitter: string | null;
  telegram: string | null;
  discord: string | null;
  docs: string | null;
}
