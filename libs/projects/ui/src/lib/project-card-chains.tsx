import { ProjectInfo } from '@jobstash/shared/core';

import { ChainList } from '@jobstash/shared/ui';

interface Props {
  projectListItem: ProjectInfo;
}

const ProjectCardChains = (props: Props) => {
  const {
    projectListItem: { chains },
  } = props;

  if (chains.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <ChainList isShort chains={chains} />
    </>
  );
};

export default ProjectCardChains;
