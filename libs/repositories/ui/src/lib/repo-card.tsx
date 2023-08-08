import { memo } from 'react';

import { type RepositoryDetails } from '@jobstash/repositories/core';

import RepoCardHeader from './repo-card-header';
import RepoCardOrg from './repo-card-org';
import RepoCardTechs from './repo-card-techs';
import RepoCardWrapper from './repo-card-wrapper';

interface Props {
  repo: RepositoryDetails;
  isActive: boolean;
  onClick: () => void;
}

const RepoCard = (props: Props) => {
  const { repo, isActive, onClick } = props;

  const { name, timestamp, technologies } = repo;

  return (
    <RepoCardWrapper href="" isActive={false} onClick={onClick}>
      <RepoCardHeader title={name} timestamp={timestamp} />
      <RepoCardTechs techs={technologies} />
      <RepoCardOrg />
    </RepoCardWrapper>
  );
};

export default memo(RepoCard);
