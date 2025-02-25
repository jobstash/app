import Link from 'next/link';

import { Button } from "@heroui/button";

import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

interface Props {
  isFree?: boolean;
  ariaDescribedBy?: string;
}

export const PricingButton = ({ isFree, ariaDescribedBy }: Props) => (
  <Button
    fullWidth
    as={Link}
    aria-describedby={ariaDescribedBy}
    href={SUPPORT_TELEGRAM_URL}
    className="bg-white/5 mt-4 "
    rel="noopener noreferrer"
    target="_blank"
    isDisabled={isFree}
  >
    {isFree ? 'FREE' : 'Buy plan'}
  </Button>
);
