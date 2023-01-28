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

/**
 * Usually listed in org/project info which might contain link.
 * If a link is present, click opens a new window.
 * */
export interface Tag {
  text: string;
  link?: string;
}

/** Any technical skills in relation to a project/job and developer */
export interface Skill {
  name: string;
  isChecked: boolean;
}
