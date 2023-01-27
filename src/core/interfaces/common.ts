/** Represents current active section ids */
export interface ActiveSectionIds {
  jobs: string;
  organizations: string;
  projects: string;
  repositories: string;
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
