export interface ShortOrg {
  id: string;
  name: string;
  location: string;
  logo: string | null;
  jobCount: number;
  projectCount: number;
  headCount: number;
  lastFundingAmount: number;
  lastFundingDate: number;
  technologies: { id: string; name: string }[];

  // ??
  website?: string;
  domain?: string;
  description?: string;
}
