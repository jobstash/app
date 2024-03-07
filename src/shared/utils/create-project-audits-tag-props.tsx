import { Audit, Hack } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { AuditsIcon } from '~/shared/components/icons/audits-icon';
import { HacksIcon } from '~/shared/components/icons/hacks-icon';

import { formatNumber } from './format-number';
import { getPluralText } from './get-plural-text';

interface Props {
  audits: Audit[];
  hacks: Hack[];
}

export const createProjectAuditTags = ({ audits, hacks }: Props) => {
  const tags: InfoTagProps[] = [];

  for (const audit of audits) {
    const count = audit.techIssues ?? 0;
    const auditText = getPluralText('Audit', count);
    const issueCount = count
      ? ` (${count} ${getPluralText('issue', count)})`
      : '';
    tags.push({
      text: `${auditText}: ${audit.name}${issueCount}`,
      icon: <AuditsIcon />,
      link: audit.link ?? undefined,
      showExternalIcon: true,
    });
  }

  for (const hack of hacks) {
    const title =
      hack.category && hack.category !== 'Other' ? hack.category : '';
    const issueType = hack.issueType ?? 'Other';
    const fundsLost = hack.fundsLost
      ? `($${formatNumber(hack.fundsLost)})`
      : '';
    tags.push({
      text: `Hack: ${title} ${issueType} ${fundsLost}`,
      icon: <HacksIcon />,
    });
  }

  return tags;
};
