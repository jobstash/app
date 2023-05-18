import { Investor } from './investors';

//
// export interface FundingRound {
//   id: string;
//   date: number;
//   raisedAmount?: number;
//   createdTimestamp: number;
//   roundName?: string;
//   sourceLink?: string;
// }

export interface FundingRound {
  // * Declared correctly
  id: string;
  date: number;
  createdTimestamp: number;

  // ? Different from actual data vs interface
  raisedAmount?: number; // * -> raisedAmount: string
  roundName?: string; // * -> roundName: string
  sourceLink?: string; // * -> sourceLink: string
  investors: Investor[]; // * -> investors: Investor[] | null
}
