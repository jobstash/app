import { ProfileOrgReview } from '@jobstash/profile/core';

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
  const cardSets = createCardSets(profileOrgReview);

  return (
    <>
      {cardSets.length > 0 && <hr className="border-t border-white/10" />}
      <div className="flex flex-col flex-wrap md:flex-row md:items-center gap-2 md:gap-x-6">
        {cardSets.map(({ icon, text, link, showLinkIcon }) => (
          <CardSet
            key={text}
            icon={icon}
            link={link}
            showLinkIcon={showLinkIcon}
          >
            {text}
          </CardSet>
        ))}
      </div>
    </>
  );
};

const createCardSets = (profileOrgReview: Props['profileOrgReview']) => {
  const { org, membershipStatus, startDate, endDate, commitCount } =
    profileOrgReview;

  const { github, website, docs, telegram, twitter, discord } = org;

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

  if (cardSets.length === 0) {
    const link = [
      github ? `http://github.com/${github}` : null,
      website,
      telegram ? `http://telegram.me/${telegram}` : null,
      twitter ? `http://twitter.com/${twitter}` : null,
      discord,
      docs,
    ].find(Boolean);

    const text = github
      ? 'Contribute to repository to view stats'
      : 'Reach out to Organization';

    if (link) {
      cardSets.push({
        icon: null,
        text,
        link,
        showLinkIcon: false,
      });
    }
  }

  return cardSets;
};

const getDateText = (date: number) =>
  new Date(date).toLocaleString().split(',')[0];
