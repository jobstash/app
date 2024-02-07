import { atom, useAtom } from 'jotai';

import { ReportPayload } from '@jobstash/shared/core';

type ReportCtx = ReportPayload['ctx'];

const isOpenAtom = atom(false);
const ctxAtom = atom<ReportCtx | null>(null);

export const useReportModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [ctx, setCtx] = useAtom(ctxAtom);

  const open = (ctx: ReportCtx) => {
    setCtx(ctx);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, open, close, ctx };
};
