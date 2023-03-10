import { Job } from '~/shared/core/interfaces';

export const createRightPanelJobDescriptions = ({
  role,
  team,
  benefits,
  culture,
}: Job) => {
  const descriptions = [{ label: 'Role', desc: role }];

  if (team) descriptions.push({ label: 'Team', desc: team });
  if (benefits) descriptions.push({ label: 'Benefits', desc: benefits });
  if (culture) descriptions.push({ label: 'Culture', desc: culture });

  return descriptions;
};
