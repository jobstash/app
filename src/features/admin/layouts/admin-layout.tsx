import Head from 'next/head';
import { ReactNode } from 'react';

import {
  Anchor,
  Breadcrumbs,
  Center,
  Input,
  MantineProvider,
  Title,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { SideBar } from '~/features/sidebar/components';

import { SearchIcon } from '../components/icons/search-icon';

interface Props {
  breadCrumbs: { title: string; href: string }[];
  sideNav: ReactNode;
  children: ReactNode;
}

export const AdminLayout = ({ breadCrumbs, sideNav, children }: Props) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <MantineProvider theme={{ colorScheme: 'dark', cursorType: 'pointer' }}>
      <Notifications position="top-right" autoClose={4000} />
      <div className="relative w-full pl-52">
        <SideBar />

        <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#191919] py-8 px-20">
          <div className="flex items-center justify-between">
            <div className="flex basis-4/12 flex-col space-y-6">
              <Title order={1}>Admin Panel</Title>
            </div>
            <div className="flex basis-8/12 items-center">
              <div className="relative w-full">
                <Input
                  icon={<SearchIcon />}
                  radius="md"
                  size="lg"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 px-20 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Breadcrumbs>
                {breadCrumbs.map(({ title, href }) => (
                  <Anchor key={title} href={href} c="dimmed">
                    {title}
                  </Anchor>
                ))}
              </Breadcrumbs>
            </div>
            <div>{sideNav}</div>
          </div>
          <Center>{children}</Center>
        </div>
      </div>
    </MantineProvider>
  </>
);
