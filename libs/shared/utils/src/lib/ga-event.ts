interface GaEventFields {
  event_category: string;
  event_label?: string;
  value?: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const gaEvent = (action: string, eventFields: GaEventFields) => {
  if (typeof window !== 'undefined' && Boolean((window as any).gtag)) {
    (window as any).gtag('event', action, eventFields);
  }
};
