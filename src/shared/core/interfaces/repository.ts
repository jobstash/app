export interface Repository {
  createdAt: string;
  fork: boolean;
  dailyHistogram: string;
  name: string;
  htmlUrl: string;
  fullName: string;
  weeklyHistogram: string;
  id: number;
  nodeId: string;
  pushedAt: string;
  url: string;
  updatedAt: string;
  language?: string;
}
