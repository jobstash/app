/** Represents `/{section}/{id}/{tab}` route pathname segments */
export interface RouteSegments {
  section: 'jobs' | 'organizations' | 'projects' | 'repositories';
  id: string; // `{org}--{job-title}-{hash}` for /jobs
  tab:
    | 'details'
    | 'jobs'
    | 'organization'
    | 'projects'
    | 'competitors'
    | 'repositories';
}

/** Anything that can be represented as range */
export interface Range {
  min: number;
  max: number;
}
