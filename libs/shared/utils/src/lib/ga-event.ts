interface GaEventFields {
  event_category: string;
  event_label?: string;
  value?: number;
}

type EventFields = Record<string, string | number> & GaEventFields;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const gaEvent = (action: string, eventFields?: EventFields) => {
  if (typeof window !== 'undefined' && Boolean((window as any).gtag)) {
    (window as any).gtag('event', action, eventFields);
  }
};
