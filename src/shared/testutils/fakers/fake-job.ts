import { faker } from '@faker-js/faker';

import { Job } from '~/shared/core/interfaces';

import { fakeDesc } from './fake-desc';

export const fakeJob = (): Job => {
  const id = faker.datatype.uuid();

  const seniority = faker.helpers.arrayElement([
    'Staff',
    'Lead',
    'Senior',
    'Mid Level',
    'Junior',
    'Intern',
  ]);

  const jobTitle = `${seniority} ${faker.helpers.arrayElement([
    'Backend',
    'Frontend',
    'dApp',
    'Cloud',
  ])} Engineer`;

  const jobCreatedTimestamp = Date.now();
  const jobFoundTimestamp = Date.now();
  const extractedTimestamp = Date.now();

  const minSalary = faker.datatype.number({ min: 60_000, max: 80_000 });
  const maxSalary = faker.datatype.number({ min: 90_000, max: 120_000 });

  const jobLocation = faker.helpers.arrayElement(['Remote', 'NYC, USA']);
  const jobCommitment = faker.helpers.arrayElement(['Full Time', 'Part Time']);

  const jobApplyPageUrl = faker.internet.url();
  const jobPageUrl = faker.internet.url();

  const role = fakeDesc();
  const team = fakeDesc();
  const benefits = fakeDesc();
  const interview = fakeDesc();

  const aiGeneratedGrammarCorrectedSummary = fakeDesc();
  const aiGeneratedTeamDescription = fakeDesc();
  const aiGeneratedEducationFreeSkills = fakeDesc();
  const aiGeneratedSplitTechnologiesSkills = fakeDesc();
  const aiGeneratedHardSkillsString = fakeDesc();

  return {
    id,
    jobTitle,
    jobCreatedTimestamp,
    jobFoundTimestamp,
    extractedTimestamp,
    minSalary,
    maxSalary,
    jobLocation,
    jobCommitment,
    jobApplyPageUrl,
    jobPageUrl,
    role,
    team,
    benefits,
    interview,
    aiGeneratedGrammarCorrectedSummary,
    aiGeneratedTeamDescription,
    aiGeneratedEducationFreeSkills,
    aiGeneratedSplitTechnologiesSkills,
    aiGeneratedHardSkillsString,
  };
};
