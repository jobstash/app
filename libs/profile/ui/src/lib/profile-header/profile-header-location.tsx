import { useMemo, useState } from 'react';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { LocationIcon, Text } from '@jobstash/shared/ui';

import { LocationModal } from './location-modal';

export const ProfileHeaderLocation = () => {
  const { location } = useProfileHeaderContext();
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);
  const openModal = () => setIsOpen(true);

  const text = useMemo(() => {
    const city = location?.city;
    const country = location?.country;

    if (!city && !country) return 'Add location';

    if (city && country) {
      return `${city}, ${country}`;
    }

    return city || country;
  }, [location]);

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer hover:underline"
        onClick={openModal}
      >
        <LocationIcon className="fill-white/80" />
        <Text size="sm" color="dimmed">
          {text}
        </Text>
      </div>
      <LocationModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
