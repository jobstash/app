import { useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { type ProfileRepo } from '@jobstash/profile/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';

import { activeProfileRepoAtom } from '@jobstash/profile/state';

import ProfileCardWrapper from './profile-card-wrapper';
import ProfileRepoCardHeader from './profile-repo-card-header';
import ProfileRepoCardOrg from './profile-repo-card-org';
import ProfileRepoCardTechs from './profile-repo-card-techs';

interface Props {
  isActive: boolean;
  profileRepo: ProfileRepo;
  isLoading: boolean;
}

const ProfileRepoCard = (props: Props) => {
  const { isActive, profileRepo, isLoading } = props;
  const {
    tags,
    org: { name: orgName, logo: orgLogo, url: orgUrl },
  } = profileRepo;

  const setActiveProfileRepo = useSetAtom(activeProfileRepoAtom);

  const onClick = useCallback(() => {
    setActiveProfileRepo(profileRepo);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  }, [profileRepo, setActiveProfileRepo]);

  return (
    <ProfileCardWrapper
      isActive={isActive}
      isLoading={isLoading}
      onClick={onClick}
    >
      <ProfileRepoCardHeader profileRepo={profileRepo} />
      <ProfileRepoCardTechs techs={tags} />
      <ProfileRepoCardOrg name={orgName} logo={orgLogo} url={orgUrl} />
    </ProfileCardWrapper>
  );
};

export default ProfileRepoCard;
