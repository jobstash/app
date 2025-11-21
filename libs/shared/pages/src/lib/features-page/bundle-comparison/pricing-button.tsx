import Link from 'next/link';

import { Button } from "@heroui/button";

import { VERI_APP_URL } from '@jobstash/shared/core';

interface Props {
  isFree?: boolean;
  ariaDescribedBy?: string;
}

export const PricingButton = ({ isFree, ariaDescribedBy }: Props) => (
  <Button
    fullWidth
    as={Link}
    aria-describedby={ariaDescribedBy}
    href={VERI_APP_URL}
    className="bg-white/5 mt-4 "
    rel="noopener noreferrer"
    target="_blank"
  >
    {isFree ? 'Start for FREE on Veri' : 'Buy plan on Veri'}
  </Button>
);
