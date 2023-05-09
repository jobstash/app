import { useRouter } from 'next/router';

import NProgress from 'nprogress';

import {
  Button,
  CardSet,
  Heading,
  LinkIcon,
  LogoTitle,
  Text,
} from '~/shared/components';
import { Category, Project } from '~/shared/core/interfaces';

import { createRightPanelProjectCardTags } from '../utils';

interface Props {
  project?: Project;
  categories: Category[];
}

export const RightPanelProjectCard = ({ project, categories }: Props) => {
  const { push } = useRouter();

  if (!project) return null;

  const { logo, name, description, url } = project;
  const { projectSocialTags, projectTags, projectTvlTags, projectAuditTags } =
    createRightPanelProjectCardTags(project, categories);

  return (
    <div className="flex flex-col gap-5 p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <LogoTitle
              size="lg"
              title={name}
              avatarProps={{
                src:
                  logo && logo.length > 0
                    ? logo
                    : `https://www.google.com/s2/favicons?domain=${url}&sz=128`,
                alt: name,
              }}
            />
            <div className="flex gap-x-4">
              {/** TODO: Bookmark, Share IconButton here */}
            </div>
          </div>

          {projectSocialTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              {projectSocialTags.map(({ text, icon, link, showLinkIcon }) => (
                <CardSet
                  key={text}
                  link={link}
                  icon={icon}
                  showLinkIcon={showLinkIcon}
                >
                  {text}
                </CardSet>
              ))}
            </div>
          )}
        </div>

        <div className="flex h-4 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Heading size="sm" fw="semibold">
              Description
            </Heading>
            <Text color="dimmed">{description}</Text>
          </div>
        </div>

        {projectTags.length > 0 && (
          <>
            <hr className="border-t border-white/10" />

            <div className="flex flex-wrap items-center gap-4">
              {projectTags.map(({ text, icon, link, showLinkIcon }) => (
                <CardSet
                  key={text}
                  link={link}
                  icon={icon}
                  showLinkIcon={showLinkIcon}
                >
                  {text}
                </CardSet>
              ))}
            </div>
          </>
        )}

        {projectTvlTags.length > 0 && (
          <>
            <hr className="border-t border-white/10" />

            <div className="flex flex-wrap items-center gap-4">
              {projectTvlTags.map(({ text, icon, link, showLinkIcon }) => (
                <CardSet
                  key={text}
                  link={link}
                  icon={icon}
                  showLinkIcon={showLinkIcon}
                >
                  {text}
                </CardSet>
              ))}
            </div>
          </>
        )}

        {projectAuditTags.length > 0 && (
          <>
            <hr className="border-t border-white/10" />

            <div className="flex flex-wrap items-center gap-4">
              {projectAuditTags.map(({ text, icon, link, showLinkIcon }) => (
                <CardSet
                  key={text}
                  link={link}
                  icon={icon}
                  showLinkIcon={showLinkIcon}
                >
                  {text}
                </CardSet>
              ))}
            </div>
          </>
        )}

        <div className="flex h-4 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <div className="flex flex-col gap-2">
          <CardSet icon={<LinkIcon />}>Chains: TBD</CardSet>
          <CardSet icon={<LinkIcon />} link="#">
            Token: TBD
          </CardSet>
        </div>

        <div className="flex h-4 flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        {/* <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Heading size="sm" fw="semibold">
              Technologies
            </Heading>
            <Text color="dimmed">
              Uncover the technical skills and tools employed by the company,
              and gain insight into the technologies that drive their success.
            </Text>
          </div>
        </div>

        <div className="flex gap-2.5">
          <TechWrapper id="0">TBD</TechWrapper>
          <TechWrapper id="8">TBD</TechWrapper>
          <TechWrapper id="2">TBD</TechWrapper>
          <TechWrapper id="3">TBD</TechWrapper>
          <TechWrapper id="6">TBD</TechWrapper>
          <TechWrapper id="7">TBD</TechWrapper>
          <TechWrapper id="5">TBD</TechWrapper>
          <TechWrapper id="9">TBD</TechWrapper>
        </div>

         */}

        <Button
          variant="primary"
          onClick={() => {
            push(`/jobs?projects=${name}`);
            NProgress.start();
          }}
        >
          Explore Project
        </Button>
      </div>
    </div>
  );
};
