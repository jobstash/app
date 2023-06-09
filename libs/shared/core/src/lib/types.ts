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

//
// export interface Technology {
//   id: string;
//   name: string;
//   normalizedName: string;
// }
export type Technology = Infer<typeof technologySchema>;

//
// export interface Investor {
//   name: string;
//   id: string;
// }
export type Investor = Infer<typeof investorSchema>;

//
// export interface FundingRound {
//   id: string;
//   date: number;
//   createdTimestamp: number;
//   raisedAmount?: number;
//   roundName?: string;
//   sourceLink?: string;
//   investors: Investor[];
// }
export type FundingRound = Infer<typeof fundingRoundSchema>;

//
// export interface Category {
//   id: string;
//   name: string;
// }
export type Category = Infer<typeof categorySchema>;

//
// export interface Chain {
//   id: string;
//   name: string;
// }
export type Chain = Infer<typeof chainSchema>;

//
// export interface Hack {
//   id: string;
//   date: number;
//   classification: string;
//   fundsLost: number;
//   link: string;
// }
export type Hack = Infer<typeof hackSchema>;

//
// export interface Audit {
//   auditor?: string;
//   link: string;
// }
export type Audit = Infer<typeof auditSchema>;

export type MwResponseFields = Infer<typeof mwResponseFieldsSchema>;
