import Image from 'next/image';

import clsx from 'clsx';

import { getTagIcon } from '~/core/constants';
import type { Project } from '~/core/interfaces';

import { Avatar } from '../unstyled-ui/base/avatar';
import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import { ChainTagIcon } from '../unstyled-ui/icons';
import { LogoTitle } from '../unstyled-ui/logo-title';
import { TechWrapper } from '../unstyled-ui/tech-wrapper';

interface Props {
  project: Project;
}

const TEXT_TECHNOLOGIES_DESC =
  'Uncover the technical skills and tools employed by the company, and gain insight into the technologies that dive their success.';

export const RightPanelProjectDetails = ({ project }: Props) => (
  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary p-1">
    <div className="flex flex-col space-y-6 rounded-2xl bg-card p-6">
      <LogoTitle
        name={project.name}
        avatar={project.avatar}
        size="xl"
        avatarSize="md"
      />

      <hr className="h-px border-0 bg-white/20" />

      <div className="flex flex-col space-y-4">
        <Text size="lg" fw="bold">
          Description
        </Text>
        <Text size="sm" fw="regular" className="text-white/60">
          {project.description}
        </Text>
      </div>

      <hr className="h-px border-0 bg-white/20" />

      <div className="flex items-center space-x-4">
        {project.tags.top.map((tag) => (
          <Button
            key={tag.text}
            size="xs"
            kind={tag.link ? undefined : 'subtle'}
            textProps={{ fw: 'regular', size: 'sm' }}
            left={getTagIcon(tag.iconKey)}
            // eslint-disable-next-line no-alert
            onClick={tag.link ? () => alert('External link') : undefined}
          >
            {tag.text}
          </Button>
        ))}
      </div>

      <hr className="h-px border-0 bg-white/20" />

      <div className="flex items-center space-x-4">
        {project.tags.bottom.map((tag) => (
          <Button
            key={tag.text}
            size="xs"
            kind={tag.link ? undefined : 'subtle'}
            textProps={{ fw: 'regular', size: 'sm' }}
            left={getTagIcon(tag.iconKey)}
            // eslint-disable-next-line no-alert
            onClick={tag.link ? () => alert('External link') : undefined}
          >
            {tag.text}
          </Button>
        ))}
      </div>

      <hr className="h-px border-0 bg-white/20" />

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Button size="xs" left={<ChainTagIcon />} kind="subtle">
            Chains:
          </Button>
          <div className="flex items-center space-x-1">
            {project.chains.map((chain) => (
              <Avatar
                key={chain.name}
                size="xs"
                src={`/chains/${chain.name}.svg`}
                alt={chain.name}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="h-px border-0 bg-white/20" />

      <div className="flex flex-col space-y-4">
        <Text size="lg" fw="bold">
          Technologies
        </Text>
        <div className="max-w-xl">
          <Text size="sm" fw="regular" className="text-white/60">
            {TEXT_TECHNOLOGIES_DESC}
          </Text>
        </div>
        <div className="flex space-x-4">
          {project.skills.map((skill) => (
            <TechWrapper
              key={skill.name}
              text={skill.name}
              isChecked={skill.isChecked}
              isParentActive={false}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
