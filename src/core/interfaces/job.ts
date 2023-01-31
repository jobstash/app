import type { Range } from './common';
import { Tech } from './tech';

interface Role {
  name: string;
  desc: string;
  label: string;
}

interface Team {
  desc: string;
  size: number;
  label: string;
}

/** Only description for now (might change in the future) */
interface Benefits {
  desc: string;
  label: string;
}

/** Only description for now (might change in the future) */
interface Interview {
  desc: string;
  label: string;
}

interface Details {
  role: Role;
  team: Team;
  benefits: Benefits;
  interview: Interview;
}

interface Skills {
  /** Skill you will be the main contributor */
  main: Tech[];
  /** Skill a team member can mentor you about */
  hasMentor: Tech[];
  /** Skill you share responsibility with others */
  shared: Tech[];
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
