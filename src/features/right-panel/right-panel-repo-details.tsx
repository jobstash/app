import { useState } from 'react';

import clsx from 'clsx';
import { uid } from 'uid';

import { getTagIcon } from '~/core/constants';
import type { Repository } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { Text } from '../unstyled-ui/base/text';
import {
  BookmarkActiveButtonIcon,
  BookmarkButtonIcon,
  DevRepoIcon,
  GithubRepoIcon,
} from '../unstyled-ui/icons';
import { TechWrapper } from '../unstyled-ui/tech-wrapper';

interface InnerProps {
  repo: Repository;
}

const BookmarkButton = () => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <Button onClick={onClick}>
      {isActive ? <BookmarkActiveButtonIcon /> : <BookmarkButtonIcon />}
    </Button>
  );
};

const Header = ({ repo }: InnerProps) => (
  <>
    <div className="flex items-center justify-between">
      <div className="-ml-4 flex items-center">
        <Button kind="subtle">
          <GithubRepoIcon />
        </Button>
        <Text htmlTag="h1" size="xl" fw="bold" className="text-white/90">
          {repo.name}
        </Text>
      </div>
      <BookmarkButton />
    </div>
    <hr className="h-px border-0 bg-white/20" />
  </>
);

interface Props {
  repos: Repository[];
}

export const RightPanelRepoDetails = ({ repos }: Props) => (
  <div className="flex flex-col space-y-4">
    {repos.map((repo) => (
      <div
        key={repo.name}
        className="flex items-center justify-center rounded-2xl bg-gradient-to-l from-primary to-secondary p-1"
      >
        <div className="w-full space-y-4 rounded-2xl bg-card px-6 py-4">
          <Header repo={repo} />

          <div className="flex flex-col space-y-4">
            <div>
              {repo.tags.map((tag) => (
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
          </div>

          <div>
            <Text size="sm" fw="regular" className="text-white/60">
              {repo.desc}
            </Text>
          </div>

          <div className="space-y-4">
            {repo.devInfos.map((devInfo) => (
              <div
                // We just concat all skill name as key xD
                key={devInfo.skills.map((skill) => skill.name).join('')}
                className="flex w-fit items-center space-x-6 rounded-xl border border-white/20 py-2 px-4"
              >
                <div className="-ml-3 flex items-center">
                  <Button kind="subtle">
                    <DevRepoIcon />
                  </Button>
                  <Text htmlTag="h3">Devs: {devInfo.devCount}</Text>
                </div>

                <div className="flex space-x-4 ">
                  {devInfo.skills.map((skill) => (
                    <TechWrapper
                      key={skill.name}
                      text={skill.name}
                      isChecked={skill.isChecked}
                      isParentActive={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);
