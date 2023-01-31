import type { Org } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import {
  DiscordTagIcon,
  GithubTagIcon,
  LinkedInTagIcon,
  TwitterTagIcon,
  WebsiteTagIcon,
} from '../unstyled-ui/icons';

interface Props {
  org: Org;
}

const Header = ({ org: { name } }: Props) => (
  <div>
    <Text size="2xl" fw="medium">
      {name}
    </Text>
  </div>
);

const Description = ({ org }: Props) => (
  <div className="max-w-xl">
    <Text size="sm" fw="regular" className="text-white/60">
      {org.description}
    </Text>
  </div>
);

const tags = [
  {
    text: 'Website',
    link: '#',
    icon: <WebsiteTagIcon />,
  },
  {
    text: 'Github',
    link: '#',
    icon: <GithubTagIcon />,
  },
  {
    text: 'Twitter',
    link: '#',
    icon: <TwitterTagIcon />,
  },
  {
    text: 'LinkedIn',
    link: '#',
    icon: <LinkedInTagIcon />,
  },
  {
    text: 'Discord',
    link: '#',
    icon: <DiscordTagIcon />,
  },
];

export const RightPanelOrg = ({ org }: Props) => (
  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary p-1">
    <div className="flex flex-col space-y-6 rounded-2xl bg-card p-6 ">
      <Header org={org} />
      <div className="">
        <hr className="h-px border-0 bg-white/20" />
      </div>
      <Description org={org} />
      <div className="flex space-x-6">
        {tags.map((tag) => (
          <Button
            key={tag.text}
            size="sm"
            textProps={{ fw: 'regular' }}
            left={tag.icon}
            // eslint-disable-next-line no-alert
            onClick={tag.link ? () => alert('External link') : undefined}
          >
            {tag.text}
          </Button>
        ))}
      </div>
    </div>
  </div>
);
