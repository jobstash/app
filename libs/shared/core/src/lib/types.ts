import type { ReactNode } from 'react';

import { type Infer } from 'myzod';

import { ROUTE_SECTION } from './constants';
import {
  allTechnologiesResponseSchema,
  auditSchema,
  categorySchema,
  chainSchema,
  fundingRoundSchema,
  hackSchema,
  investorSchema,
  jobInfoSchema,
  mwResponseFieldsSchema,
  orgInfoSchema,
  projectCompleteInfoSchema,
  projectInfoSchema,
  projectMoreInfoSchema,
  repositoryInfoSchema,
  technologySchema,
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

export type Technology = Infer<typeof technologySchema>;
export type AllTechnologiesResponse = Infer<
  typeof allTechnologiesResponseSchema
>;

export type Investor = Infer<typeof investorSchema>;

export type FundingRound = Infer<typeof fundingRoundSchema>;

export type Category = Infer<typeof categorySchema>;

export type Chain = Infer<typeof chainSchema>;

export type Hack = Infer<typeof hackSchema>;

export type Audit = Infer<typeof auditSchema>;

export type JobInfo = Infer<typeof jobInfoSchema>;
export type OrgInfo = Infer<typeof orgInfoSchema>;
export type ProjectInfo = Infer<typeof projectInfoSchema>;
export type ProjectMoreInfo = Infer<typeof projectMoreInfoSchema>;
export type ProjectCompleteInfo = Infer<typeof projectCompleteInfoSchema>;
export type RepositoryInfo = Infer<typeof repositoryInfoSchema>;

export type MwResponseFields = Infer<typeof mwResponseFieldsSchema>;

export type RouteSection = typeof ROUTE_SECTION[keyof typeof ROUTE_SECTION];
