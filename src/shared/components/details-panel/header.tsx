import { OrgInfo } from '~/shared/core/schemas';
import { OrgInfoTagProps } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { createSocialsInfoTagProps } from '~/shared/utils/create-socials-info-tag-props';
import { getLogoUrl } from '~/shared/utils/get-logo-url';
import { getWebsiteText } from '~/shared/utils/get-website-text';
import { LocationIcon } from '~/shared/components/icons/location-icon';
import { UsersThreeIcon } from '~/shared/components/icons/users-three-icon';
import { InfoTags } from '~/shared/components/info-tags';
import { LogoTitle } from '~/shared/components/logo-title';
import { Text } from '~/shared/components/text';

interface Props {
  org: OrgInfo;
}

export const DetailsPanelHeader = ({ org }: Props) => {
  const { name, logoUrl, website, summary } = org;
  const src = getLogoUrl(website!, logoUrl);
  const tags = createInfoTagProps(org);
  const socials = createSocialsInfoTagProps(org, { website: false });

  return (
    <div className="flex flex-col gap-4">
      <LogoTitle src={src} name={name} />
      <InfoTags tags={tags} draggable />
      <Text text={summary} />
      <InfoTags tags={socials} draggable />
    </div>
  );
};

export const createInfoTagProps = (props: OrgInfoTagProps) => {
  const { website, location, headcountEstimate } = props;

  const tags: InfoTagProps[] = [];

  if (website) {
    const { hostname, link } = getWebsiteText(website);
    tags.push({
      text: hostname,
      icon: null,
      link,
      showExternalIcon: true,
    });
  }

  if (location) {
    tags.push({
      text: location,
      icon: <LocationIcon />,
    });
  }

  if (headcountEstimate) {
    tags.push({
      text: `Employees: ${headcountEstimate}`,
      icon: <UsersThreeIcon />,
    });
  }

  return tags;
};
