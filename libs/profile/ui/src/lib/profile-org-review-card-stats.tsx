import { ProfileOrgReview } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { useDevProfileInfoContext } from '@jobstash/profile/state';

import {
  CardSet,
  CommitIcon,
  EndDateIcon,
  MembershipStatusIcon,
  StartDateIcon,
} from '@jobstash/shared/ui';

interface Props {
  profileOrgReview: ProfileOrgReview;
}

export const ProfileOrgReviewCardStats = ({ profileOrgReview }: Props) => {
  const { profileInfoData } = useDevProfileInfoContext();
  const isConnectedToGithub = Boolean(profileInfoData?.linkedAccounts.github);

  const cardSets = createCardSets(profileOrgReview, isConnectedToGithub);

  return (
    <>
      {cardSets.length > 0 && <hr className="border-t border-white/10" />}
      <div className="flex flex-col flex-wrap md:flex-row md:items-center gap-2 md:gap-x-6">
        {cardSets.map(({ icon, text, link, isExternal }) => (
          <CardSet key={text} icon={icon} link={link} isExternal={isExternal}>
            {text}
          </CardSet>
        ))}
      </div>
    </>
  );
};

const createCardSets = (
  profileOrgReview: Props['profileOrgReview'],
  isConnectedToGithub: boolean,
) => {
  const { org, membershipStatus, startDate, endDate, commitCount } =
    profileOrgReview;

  const { name, github, website, docs, telegram, twitter, discord } = org;

  const cardSets = [];

  if (membershipStatus) {
    cardSets.push({
      icon: <MembershipStatusIcon />,
      text: membershipStatus,
    });
  }

  if (startDate) {
    cardSets.push({
      icon: <StartDateIcon />,
      text: getDateText(startDate),
    });
  }

  if (endDate) {
    cardSets.push({
      icon: <EndDateIcon />,
      text: getDateText(endDate),
    });
  }

  if (commitCount) {
    cardSets.push({
      icon: <CommitIcon />,
      text: commitCount,
    });
  }

  if (!isConnectedToGithub) {
    cardSets.push({
      icon: null,
      text: 'Connect your Github Account',
      link: `${MW_URL}/github/trigger-dev-github-oauth`,
      isExternal: false,
    });
  }

  if (github) {
    cardSets.push({
      icon: null,
      text: `Contribute to ${name}`,
      link: `http://github.com/${github}`,
    });
  }

  const contactLink = [
    website,
    telegram ? `http://telegram.me/${telegram}` : null,
    twitter ? `http://twitter.com/${twitter}` : null,
    discord,
    docs,
  ].find(Boolean);
  if (contactLink) {
    cardSets.push({
      icon: null,
      text: `Get In Touch`,
      link: contactLink,
    });
  }

  return cardSets;
};

const getDateText = (date: number) =>
  new Date(date).toLocaleString().split(',')[0];
