/** Represents `/{section}/{id}/{tab}` route pathname segments */
export interface RouteSegments {
  section: 'jobs'; // TODO: add other sections
  id: string; // In the form `{org}--{job-title}-{hash}
  tab: 'details' | 'organization' | 'project' | 'competitors' | 'repositories';
}

/** Anything that can be represented as range */
export interface Range {
  min: number;
  max: number;
}
