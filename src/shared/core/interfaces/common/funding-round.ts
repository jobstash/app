export interface FundingRound {
  id: string;
  date: number;
  raisedAmount?: number;
  createdTimestamp: number;
  roundName?: string;
  sourceLink?: string;
}
