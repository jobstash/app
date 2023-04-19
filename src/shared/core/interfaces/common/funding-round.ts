export interface FundingRound {
  id: string;
  date: number;
  raisedAmount: number;
  roundName?: string;
  sourceLink?: string;
  createdTimestamp: number;
}
