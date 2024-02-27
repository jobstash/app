/* eslint-disable jsx-a11y/accessible-emoji */
import Head from 'next/head';
import { useCallback } from 'react';

import { fakeJobApplicants } from '@jobstash/jobs/testutils';
import { Chip } from '@nextui-org/chip';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { JobApplicant } from '@jobstash/jobs/core';
import { cn, prettyTimestamp } from '@jobstash/shared/utils';

import { Heading, LogoTitle, PageWrapper, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgApplicantsPage = () => {
  const applicants = fakeJobApplicants().map((a, i) => ({ ...a, key: i }));

  const isFetching = false;

  const renderCell = useCallback(
    (applicant: JobApplicant, columnKey: ColumnKey) => {
      if (columnKey === 'user') {
        const {
          user: { avatar, name, email },
        } = applicant;
        return (
          <LogoTitle
            title={name}
            location={email}
            avatarProps={{ src: avatar, alt: name }}
          />
        );
      }

      if (columnKey === 'job') {
        const {
          job: { title, sub },
        } = applicant;
        return (
          <div className="flex flex-col gap-2 w-fit min-w-[240px]">
            <Heading size="sm">{title}</Heading>
            <Text color="dimmed">{sub}</Text>
          </div>
        );
      }

      if (columnKey === 'date') {
        const date = prettyTimestamp(applicant[columnKey]);
        return (
          <div className="flex flex-col gap-2 w-fit min-w-[120px]">
            <Text color="dimmed">{date}</Text>
          </div>
        );
      }

      if (columnKey === 'cryptoNative') {
        const isTrue = applicant[columnKey];
        const text = isTrue ? 'Yes' : 'No';
        const color = isTrue ? 'success' : 'default';
        return (
          <div className="flex w-full justify-center">
            <Chip color={color}>{text}</Chip>
          </div>
        );
      }

      if (columnKey === 'attestations') {
        const {
          attestations: { up, down },
        } = applicant;
        return (
          <div className="flex flex-col gap-2 items-center">
            <div className="flex gap-2">
              <div className="min-w-[24px]">
                <Text color="dimmed">{`${up}x`}</Text>
              </div>
              <Text>👍</Text>
            </div>
            <div className="flex gap-2">
              <div className="min-w-[24px]">
                <Text color="dimmed">{`${down}x`}</Text>
              </div>
              <Text>👎</Text>
            </div>
          </div>
        );
      }

      if (columnKey === 'matchingSkills') {
        return (
          <div className="flex w-full justify-center">
            <Text color="dimmed">{applicant[columnKey]}</Text>
          </div>
        );
      }

      if (columnKey === 'upcomingTalent') {
        const isTrue = applicant[columnKey];
        const text = isTrue ? 'Yes' : 'No';
        const color = isTrue ? 'success' : 'default';
        return (
          <div className="flex w-full justify-center">
            <Chip color={color}>{text}</Chip>
          </div>
        );
      }

      if (columnKey === 'oss') {
        const isTrue = applicant[columnKey];
        const text = isTrue ? 'Yes' : 'No';
        const color = isTrue ? 'success' : 'default';
        return (
          <div className="flex w-full justify-center">
            <Chip color={color}>{text}</Chip>
          </div>
        );
      }

      if (columnKey === 'interviewed') {
        return (
          <div className="flex w-full justify-center">
            <Text color="dimmed">TODO</Text>
          </div>
        );
      }

      if (columnKey === 'hired') {
        return (
          <div className="flex w-full justify-center">
            <Text color="dimmed">TODO</Text>
          </div>
        );
      }

      if (columnKey === 'actions') {
        return (
          <div className="flex w-full justify-center">
            <Text color="dimmed">TODO</Text>
          </div>
        );
      }

      return null;
    },
    [],
  );

  return (
    <>
      <Head>
        <title>Job Applicants</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <Table
          aria-label={TABLE_ARIA}
          classNames={{
            base: cn({ 'pointer-events-none opacity-60': isFetching }),
          }}
        >
          <TableHeader columns={COLUMNS}>
            {(column) => (
              <TableColumn key={column.key}>
                <div
                  className={cn('flex items-center', {
                    'justify-center': CENTERED_COLUMNS.has(column.key),
                  })}
                >
                  <Text size="md" fw="bold">
                    {column.label}
                  </Text>
                </div>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={applicants}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as ColumnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </PageWrapper>
    </>
  );
};

const TABLE_ARIA = 'Table of Job Approvals';

type ProfileInfoKey = keyof JobApplicant;
type ColumnKey = ProfileInfoKey | 'interviewed' | 'hired' | 'actions';

const COLUMNS = [
  { key: 'user', label: 'User' },
  { key: 'job', label: 'Job' },
  { key: 'date', label: 'Date' },
  { key: 'cryptoNative', label: 'CryptoNative' },
  { key: 'attestations', label: 'Attestations' },
  { key: 'matchingSkills', label: 'Matching Skills' },
  { key: 'upcomingTalent', label: 'Upcoming Talent' },
  { key: 'oss', label: 'OSS' },
  { key: 'interviewed', label: 'Interviewed' },
  { key: 'hired', label: 'Hired' },
  { key: 'actions', label: 'Actions' },
];

const CENTERED_COLUMNS = new Set([
  'attestations',
  'matchingSkills',
  'upcomingTalent',
  'oss',
  'interviewed',
  'hired',
  'actions',
]);
