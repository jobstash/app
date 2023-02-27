import { Job } from '~/shared/core/interfaces';

export const createRightPanelJobDescriptions = ({
  role,
  team,
  benefits,
  interview,
}: Job) => [
  { label: 'Role', desc: role },
  { label: 'Team', desc: team },
  { label: 'Benefits', desc: benefits },
  { label: 'Interview', desc: interview },
];
