import { GA_EVENT_ACTION } from '@jobstash/shared/core';

interface GaEventFields {
  event_category: string;
  event_label?: string;
  value?: number;
}

type EventFields = Record<string, string | number> & GaEventFields;
type GAEventAction = typeof GA_EVENT_ACTION[keyof typeof GA_EVENT_ACTION];

/* eslint-disable @typescript-eslint/no-explicit-any */
export const gaEvent = (action: GAEventAction, eventFields?: EventFields) => {
  if (typeof window !== 'undefined' && Boolean((window as any).gtag)) {
    (window as any).gtag('event', action, eventFields);
  }
};
