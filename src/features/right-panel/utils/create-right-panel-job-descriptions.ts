import { Job } from '~/shared/core/interfaces';

export const createRightPanelJobDescriptions = ({
  role,
  team,
  benefits,
  culture,
}: Job) => [
  { label: 'Role', desc: role },
  { label: 'Team', desc: team },
  { label: 'Benefits', desc: benefits },
  { label: 'Culture', desc: culture },
];
