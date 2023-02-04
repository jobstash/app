export interface RouteSegments {
  section: 'jobs' | 'organizations' | 'projects' | 'repositories';
  key: string;
  tab:
    | 'details'
    | 'jobs'
    | 'organization'
    | 'projects'
    | 'competitors'
    | 'repositories';
}
