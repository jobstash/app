'use client';

import { useRouter } from 'next/navigation';

import { NextUIProvider as BaseProvider } from '@nextui-org/system';

export const NextUIProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <BaseProvider navigate={router.push}>
      <main className="bg-base-dark text-white dark">{children}</main>
    </BaseProvider>
  );
};
