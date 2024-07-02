/* eslint-disable complexity */
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Link } from '@nextui-org/link';
import { Selection } from '@nextui-org/react';

import { DevTalent } from '@jobstash/profile/core';
import {
  checkSearchFilterValue,
  getContactLink,
  sanitizeShowcaseUrl,
} from '@jobstash/profile/utils';
import { capitalize } from '@jobstash/shared/utils';

import {
  useDevTalents,
  useOrgProfileInfoContext,
} from '@jobstash/profile/state';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';
import { LogoTitle, Text } from '@jobstash/shared/ui';

export const useTalentsTable = () => {
  const { profileInfoData } = useOrgProfileInfoContext();

  const [activeList, setActiveList] = useState<
    'all' | 'new' | 'shortlisted' | 'archived'
  >('all');

  const { data, isFetching, isPending: isPendingQuery } = useDevTalents();

  const [searchFilter, setSearchFilter] = useState('');

  const talents = useMemo(() => data ?? [], [data]);

  const filteredItems = useMemo(() => {
    if (!searchFilter) return talents;

    let result = talents;

    if (searchFilter) {
      result = talents.filter((talent) =>
        checkSearchFilterValue(
          searchFilter,
          ...Object.values(talent.contact),
          ...Object.values(talent.location),
          talent.username,
          talent.wallet,
        ),
      );
    }

    return result;
  }, [searchFilter, talents]);

  const [page, setPage] = useState(1);
  const totalPageCount = Math.ceil(filteredItems.length / ROWS_PER_PAGE);

  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearchFilter(value);
      setPage(1);
    } else {
      setSearchFilter('');
    }
  }, []);

  const [selectedTalents, setSelectedTalents] = useState<Set<string>>(
    new Set(),
  );
  const onTableSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      const allValues = new Set();
      for (const applicant of filteredItems) {
        allValues.add(applicant.wallet);
      }

      setSelectedTalents(allValues as Set<string>);
    } else if ((keys as Set<string>).size > 0) {
      setSelectedTalents(keys as Set<string>);
    } else {
      setSelectedTalents(new Set());
    }
  };

  const renderCell = useCallback(
    (talent: DevTalent, columnKey: keyof DevTalent | CustomColumnKeys) => {
      if (columnKey === 'talent') {
        const {
          username,
          avatar,
          email,
          location: locationData,
          preferred,
          contact,
          showcases,
        } = talent;
        const { city, country } = locationData ?? { city: '', country: '' };

        // Devs have either username or email;
        const title = username ?? (email as string);
        const location =
          !city && !country
            ? undefined
            : `${city ? `${city}` : ''}${city && country ? ', ' : ' '}${
                country ?? ''
              }`;

        const contactLink = getContactLink(
          preferred,
          contact[preferred as keyof typeof contact],
        );

        return (
          <div
            className="flex flex-col gap-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <LogoTitle
              key={title}
              title={title}
              location={location}
              avatarProps={{
                src: avatar ?? '',
                alt: username ?? email ?? '',
                name: username ?? email ?? '',
              }}
            />

            <div className="flex flex-col gap-0.5">
              {contactLink && (
                <div className="flex gap-1">
                  <Link
                    href={contactLink}
                    size="sm"
                    underline="hover"
                    className="font-semibold text-white/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact[preferred as keyof typeof contact] === 'Email'
                      ? 'Send Email'
                      : `Open ${capitalize(preferred)}`}
                  </Link>
                </div>
              )}

              {showcases.length > 0 &&
                showcases.map(({ id, label, url }) => (
                  <Link
                    key={id}
                    href={sanitizeShowcaseUrl(url)}
                    size="sm"
                    underline="hover"
                    className="font-semibold text-white/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open {label}
                  </Link>
                ))}
            </div>
          </div>
        );
      }

      if (columnKey === 'skills') {
        const { skills } = talent;

        if (skills.length === 0) {
          return <EmptyCellPlaceholder isCentered={false} />;
        }

        return (
          <div className="flex gap-2 w-full flex-wrap max-w-xs py-2">
            {skills.map(({ id, name }) => (
              <Chip key={id} color="default" radius="sm">
                {capitalize(name)}
              </Chip>
            ))}
          </div>
        );
      }

      if (columnKey === 'attestations') {
        return (
          <div className="flex flex-col gap-2 w-full items-center">
            <div className="flex items-center gap-2 justify-end">
              <div className="min-w-[20px]">
                <Text fw="bold">TBD</Text>
              </div>
              <span role="img" aria-label="upvote">
                👍
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div className="min-w-[20px] flex justify-end">
                <Text fw="bold">TBD</Text>
              </div>
              <span role="img" aria-label="downvote">
                👎
              </span>
            </div>
          </div>
        );
      }

      if (columnKey === 'hired') {
        return (
          <div className="flex w-full justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-l from-primary to-tertiary"
            >
              <Text fw="bold">Attest</Text>
            </Button>
          </div>
        );
      }

      if (columnKey === 'interviewed') {
        return (
          <div className="flex w-full justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-l from-primary to-tertiary"
            >
              <Text fw="bold">Attest</Text>
            </Button>
          </div>
        );
      }

      if (columnKey === 'fake') {
        return (
          <div className="flex w-full justify-center">
            <Button
              size="sm"
              className="bg-gradient-to-l from-primary to-tertiary"
            >
              <Text fw="bold">Attest</Text>
            </Button>
          </div>
        );
      }

      if (columnKey === 'actions') {
        return (
          <div className="flex w-full  justify-center">
            <p>TODO</p>
          </div>
        );
      }

      return <EmptyCellPlaceholder />;
    },
    [],
  );

  return {
    profileInfoData,
    isLoading: !profileInfoData || !data || isPendingQuery || isFetching,
    totalApplicantCount: data?.length,
    items,
    searchFilter,
    setSearchFilter,
    onSearchChange,
    page,
    setPage,
    totalPageCount,
    pageRowCount: ROWS_PER_PAGE,
    columns,
    centeredSet,
    renderCell,
    selectedTalents,
    onTableSelectionChange,
    activeList,
    setActiveList,
  };
};

const ROWS_PER_PAGE = 8;

type CustomColumnKeys =
  | 'talent'
  | 'attestations'
  | 'hired'
  | 'interviewed'
  | 'fake'
  | 'actions';

const columns = [
  { key: 'talent', label: 'Talent' },
  { key: 'skills', label: 'Skills' },
  { key: 'attestations', label: 'Attestations' },
  { key: 'hired', label: 'Hired' },
  { key: 'interviewed', label: 'Interviewed' },
  { key: 'fake', label: 'Fake' },
  { key: 'actions', label: 'Actions' },
];

const centeredSet = new Set([
  'actions',
  'attestations',
  'hired',
  'interviewed',
  'fake',
]);
