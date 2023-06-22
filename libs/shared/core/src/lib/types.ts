import type { ReactNode } from 'react';

import { type Infer } from 'myzod';

import {
  auditSchema,
  categorySchema,
  chainSchema,
  fundingRoundSchema,
  hackSchema,
  investorSchema,
  mwResponseFieldsSchema,
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

export type Investor = Infer<typeof investorSchema>;

export type FundingRound = Infer<typeof fundingRoundSchema>;

export type Category = Infer<typeof categorySchema>;

export type Chain = Infer<typeof chainSchema>;

export type Hack = Infer<typeof hackSchema>;

export type Audit = Infer<typeof auditSchema>;

export type MwResponseFields = Infer<typeof mwResponseFieldsSchema>;
