import type { Range, Skill } from './common';

interface Role {
  name: string;
  desc: string;
}

interface Team {
  desc: string;
  size: number;
}

/** Only description for now (might change in the future) */
interface Benefits {
  desc: string;
}

/** Only description for now (might change in the future) */
interface Interview {
  desc: string;
}

interface Details {
  role: Role;
  team: Team;
  benefits: Benefits;
  interview: Interview;
}

interface Skills {
  /** Skill you will be the main contributor */
  main: Skill[];
  /** Skill a team member can mentor you about */
  hasMentor: Skill[];
  /** Skill you share responsibility with others */
  shared: Skill[];
}

export interface Job {
  id: string; // * ASSUMPTION: in the form of `{org}--{job-title}-{hash}`
  title: string;
  salary: Range;
  location: string;
  tz: string;
  created: string;
  details: Details;
  skills: Skills;
}
