import type { Post } from '~/core/interfaces';

import { RepoRightPanel } from './repo-right-panel';

interface Props {
  repos?: Post['repos'];
}

export const ReposRightPanel = ({ repos }: Props) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div>
      {repos.map((repo) => (
        <RepoRightPanel key={repo.name} repo={repo} />
      ))}
    </div>
  );
};
