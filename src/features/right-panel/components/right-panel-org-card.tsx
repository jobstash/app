import { IconHolder } from '~/shared/components';
import { Organization } from '~/shared/core/interfaces';

import { createRightPanelOrgCardTags } from '../utils';

interface Props {
  org: Organization;
}

export const RightPanelOrgCard = ({ org }: Props) => {
  const { name, description } = org;

  const { topTags, bottomTags } = createRightPanelOrgCardTags(org);

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium">{name}</h2>

      <div className="mt-4 border-t border-white/5 py-4">
        <p>{description}</p>
      </div>

      {topTags.length > 0 && (
        <div className="flex space-x-4 border-y border-white/10 py-4 text-sm">
          {topTags.map(({ text, iconText }) => (
            <IconHolder key={text} className="mr-6" iconText={iconText}>
              {text}
            </IconHolder>
          ))}
        </div>
      )}

      {bottomTags.length > 0 && (
        <div className="flex space-x-4 border-b border-white/10 py-4 text-sm">
          {bottomTags.map(({ text, iconText }) => (
            <IconHolder key={text} className="mr-6" iconText={iconText}>
              {text}
            </IconHolder>
          ))}
        </div>
      )}
    </div>
  );
};
