import type { Tech } from './tech';

export interface Job {
  id: number;
  title: string;
  role: JobRole;
  salary: string;
  location: string;
  team: JobTeam;
  benefits: string;
  interview: string;
  skills: JobSkills;
}

interface JobRole {
  name: string;
  description: string;
}

interface JobTeam {
  size: number;
  description: string;
}

interface JobSkills {
  main: Tech[];
  hasMentor: Tech[];
  shared: Tech[];
}
