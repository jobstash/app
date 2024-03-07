import { ProjectInfo } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { createProjectInfoTagProps } from '~/shared/utils/create-project-info-tag-props';
import { formatNumber } from '~/shared/utils/format-number';
import { getPluralText } from '~/shared/utils/get-plural-text';
import { AuditsIcon } from '~/shared/components/icons/audits-icon';
import { HacksIcon } from '~/shared/components/icons/hacks-icon';

export const createJobCardProjectInfoTags = (project: ProjectInfo) => {
  const { audits, hacks } = project;

  const tags: InfoTagProps[] = [];

  tags.push(...createProjectInfoTagProps(project));

  if (audits.length) {
    tags.push({
      text: `${getPluralText('Audit', audits.length)}: ${formatNumber(audits.length)}`,
      icon: <AuditsIcon />,
    });
  }

  if (hacks.length) {
    tags.push({
      text: `${getPluralText('Hack', hacks.length)}: ${formatNumber(hacks.length)}`,
      icon: <HacksIcon />,
    });
  }

  return tags;
};
