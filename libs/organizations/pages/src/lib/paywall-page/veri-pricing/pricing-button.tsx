import Link from 'next/link';

import { Button } from '@nextui-org/button';

import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

interface Props {
  ariaDescribedBy?: string;
}

export const PricingButton = ({ ariaDescribedBy }: Props) => (
  <Button
    fullWidth
    as={Link}
    aria-describedby={ariaDescribedBy}
    href={SUPPORT_TELEGRAM_URL}
    className="bg-white/5 mt-4 "
  >
    Buy plan
  </Button>
);
