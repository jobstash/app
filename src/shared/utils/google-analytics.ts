import { NEXT_PUBLIC_GA_MEASUREMENT_ID } from '../core/constants';

interface Options {
  category?: string;
  label?: string;
  value?: number;
}

interface GaOptions {
  event_category?: string;
  event_label?: string;
  value?: number;
}

export const gaEvent = (action: string, options?: Options) => {
  if (typeof window !== 'undefined') {
    const gaOptions: GaOptions | undefined = options
      ? {
          ...(options.category && { event_category: options.category }),
          ...(options.label && { event_label: options.label }),
          ...(options.value && { value: options.value }),
        }
      : undefined;

    (window as any).gtag('event', action, gaOptions);
  }
};

export const gaPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    (window as any).gtag('config', NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
