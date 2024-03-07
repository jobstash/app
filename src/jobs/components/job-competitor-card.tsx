import { Competitor } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { createProjectInfoTagProps } from '~/shared/utils/create-project-info-tag-props';
import { getLogoUrl } from '~/shared/utils/get-logo-url';
import { getWebsiteText } from '~/shared/utils/get-website-text';
import { ChainsInfoTag } from '~/shared/components/chains-info-tag';
import { DetailsPanelActionsWrapper } from '~/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { DetailsPanelCTA } from '~/shared/components/details-panel/cta';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { GithubTagIcon } from '~/shared/components/icons/github-tag-icon';
import { SuitCaseIcon } from '~/shared/components/icons/suit-case-icon';
import { InfoTag } from '~/shared/components/info-tag';
import { InfoTags } from '~/shared/components/info-tags';
import { LogoTitle } from '~/shared/components/logo-title';
import { Text } from '~/shared/components/text';

interface Props {
  competitor: Competitor;
}

export const JobCompetitorCard = ({ competitor }: Props) => {
  const { website, logo, name, description, chains } = competitor;
  const src = getLogoUrl(website, logo);

  const websiteTag = createWebsiteTag(website);
  const tags = createInfoTags(competitor);

  return (
    <DetailsPanelCardWrapper>
      <LogoTitle src={src}>
        <Heading text={name} className="text-lg font-bold" />
      </LogoTitle>

      <Text text={description} />

      <div className="w-fit">
        <InfoTag tag={websiteTag} />
      </div>

      <DetailsPanelActionsWrapper>
        <DetailsPanelCTA text={CTA_TEXT} />
      </DetailsPanelActionsWrapper>

      <Divider />

      <div className="flex flex-wrap items-center gap-4">
        <InfoTags compact tags={tags} />
        <ChainsInfoTag chains={chains} />
      </div>
    </DetailsPanelCardWrapper>
  );
};

const CTA_TEXT = 'Explore Competitor';

const createWebsiteTag = (website: string) => {
  const { hostname, link } = getWebsiteText(website);
  return {
    text: hostname,
    icon: null,
    link,
    showExternalIcon: true,
  };
};

const createInfoTags = (competitor: Competitor) => {
  const tags: InfoTagProps[] = [];

  const jobCount = competitor.jobs.length;
  if (jobCount > 0) {
    tags.push({
      text: `Jobs: ${jobCount}`,
      icon: <SuitCaseIcon />,
    });
  }

  const repoCount = competitor.repos.length;
  if (repoCount > 0) {
    tags.push({
      text: `Relevant Repos: ${repoCount}`,
      icon: <GithubTagIcon />,
    });
  }

  tags.push(...createProjectInfoTagProps(competitor));

  return tags;
};
