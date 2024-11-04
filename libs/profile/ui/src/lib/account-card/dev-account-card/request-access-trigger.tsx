import Link from 'next/link';

import { Button, Chip, Spinner } from '@nextui-org/react';

import { CALENDLY_SCHEDULE_LINK } from '@jobstash/shared/core';
import { openNewTab } from '@jobstash/shared/utils';

import { useAffiliationRequests } from '@jobstash/profile/state';

interface Props {
  orgId: string;
  slug: string;
  openModal: () => void;
}

const openCalendlyLink = () => {
  openNewTab(CALENDLY_SCHEDULE_LINK);
};

export const RequestAccessTrigger = ({ orgId, slug, openModal }: Props) => {
  const { data } = useAffiliationRequests({ orgId, list: 'all' });

  if (!data) {
    return <Spinner size="sm" color="white" />;
  }

  const status = data.find((d) => d.orgId === orgId)?.status;

  if (status === 'pending') {
    return (
      <div className="flex gap-4 items-center">
        <Chip size="sm" color="warning" variant="dot">
          Pending
        </Chip>
        <Button
          size="sm"
          variant="flat"
          className="text-white font-bold"
          onPress={openCalendlyLink}
        >
          Reschedule
        </Button>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <Button
        size="sm"
        variant="flat"
        className="text-white font-bold"
        as={Link}
        href={`/profile/organizations/${slug}`}
      >
        Manage
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="flat"
      className="text-white font-bold"
      onPress={openModal}
    >
      Request Access
    </Button>
  );
};
