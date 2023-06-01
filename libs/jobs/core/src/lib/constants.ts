export const jobSeniorityMapping = {
  Intern: '1',
  Junior: '2',
  Senior: '3',
  Lead: '4',
  Head: '5',
};

export const jobSenioritySet = new Set(Object.keys(jobSeniorityMapping));

export const jobsDynamicSlugSet = new Set(['slug', 'tab']);
