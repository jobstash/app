import { CardSet, Heading, Text } from '~/shared/components';
import { Organization } from '~/shared/core/interfaces';

import { createRightPanelOrgCardTags } from '../utils';

interface Props {
  org: Organization;
}

export const RightPanelOrgCard = ({ org }: Props) => {
  const { name, description } = org;

  const { topTags, bottomTags } = createRightPanelOrgCardTags(org);

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-6">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>

        <div className="flex h-fit flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <div>
          <Text color="dimmed">{description}</Text>
        </div>

        {topTags.length > 0 && (
          <>
            <div className="flex h-fit flex-col justify-center">
              <hr className="border-t border-white/10" />
            </div>

            <div className="flex gap-x-4 pl-0.5">
              {topTags.map(({ text, link, icon }) => (
                <CardSet key={text} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>

            <div className="flex h-fit flex-col justify-center">
              <hr className="border-t border-white/10" />
            </div>
          </>
        )}

        {bottomTags.length > 0 && (
          <div className="flex gap-x-4 pl-0.5">
            {bottomTags.map(({ text, link, icon }) => (
              <CardSet key={text} link={link} icon={icon}>
                {text}
              </CardSet>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
