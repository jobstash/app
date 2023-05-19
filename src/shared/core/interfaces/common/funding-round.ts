import { Investor } from './investors';

export interface FundingRound {
  id: string;
  date: number;
  createdTimestamp: number;
  raisedAmount?: number;
  roundName?: string;

  investors: Investor[];

  // Possibly unused
  sourceLink?: string;
}
