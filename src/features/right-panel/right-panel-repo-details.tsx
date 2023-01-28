import clsx from 'clsx';
import { uid } from 'uid';

import type { Repository } from '~/core/interfaces';

interface InnerProps {
  repo: Repository;
}

const Header = ({ repo }: InnerProps) => (
  <>
    <div>
      <h2 className="text-xl font-semibold">{repo.name}</h2>
    </div>
    <hr className="h-px border-0 bg-neutral-500" />
  </>
);

const Description = ({ repo }: InnerProps) => (
  <div className="max-w-xl">
    <span className="text-xs text-zinc-500">{repo.desc}</span>
  </div>
);

interface Props {
  repos: Repository[];
}

export const RightPanelRepoDetails = ({ repos }: Props) => (
  <div className="flex flex-col space-y-4">
    {repos.map((repo) => (
      <div
        key={repo.name}
        className="space-y-4 rounded-2xl border border-zinc-600 p-6"
      >
        <Header repo={repo} />
        <Description repo={repo} />

        <div className="space-y-4">
          {repo.devInfos.map((devInfo) => (
            <div
              // We just concat all skill name as key xD
              key={devInfo.skills.map((skill) => skill.name).join('')}
              className="flex w-fit items-center space-x-6 rounded-lg border border-zinc-600 p-3"
            >
              <h3 className="text-sm">{devInfo.devCount} Devs</h3>

              <div className="flex space-x-4 ">
                {devInfo.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={clsx('border border-zinc-500 py-2 px-4', {
                      'border-red-700': skill.isChecked,
                    })}
                  >
                    <h3 className="text-xs">{skill.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
