import { type ProfileRepoTag } from '@jobstash/profile/core';
import { tagSortFn } from '@jobstash/profile/utils';

import { TechWrapper } from '@jobstash/shared/ui';

interface Props {
  techs: ProfileRepoTag[];
}

const ProfileRepoCardTechs = (props: Props) => {
  const { techs } = props;

  if (techs.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="items-center justify-between lg:flex py-1">
        <div className="flex flex-wrap gap-4">
          {techs.sort(tagSortFn).map(({ name, id, canTeach }) => (
            <TechWrapper key={id} isChecked id={id} canTeach={canTeach}>
              {name}
            </TechWrapper>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileRepoCardTechs;
