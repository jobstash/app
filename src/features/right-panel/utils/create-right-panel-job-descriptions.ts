import { JobPost } from '~/shared/core/interfaces';

export const createRightPanelJobDescriptions = ({
  role,
  team,
  benefits,
  culture,
}: JobPost) => {
  const descriptions = [];

  if (role) descriptions.push({ label: 'Role', desc: role });
  if (team) descriptions.push({ label: 'Team', desc: team });
  if (benefits) descriptions.push({ label: 'Benefits', desc: benefits });
  if (culture) descriptions.push({ label: 'Culture', desc: culture });

  return descriptions;
};
