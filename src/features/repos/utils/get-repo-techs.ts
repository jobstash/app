import type { Repository, Tech } from '~/core/interfaces';

export const getRepoTechs = (repo: Repository): Tech[] => {
  const techs: Tech[] = [];

  for (const devInfo of repo.devInfos) {
    techs.push(...devInfo.techs);
  }

  return techs;
};
