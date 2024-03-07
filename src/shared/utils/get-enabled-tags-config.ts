import { EnabledTagsConfig } from '~/shared/core/types';

export const getEnabledTagsConfig = <T extends Object>(
  tags: Partial<T>,
  config?: EnabledTagsConfig<T>,
) => {
  const defaultConfig = {} as Record<keyof T, boolean>;
  for (const k of Object.keys(tags)) {
    defaultConfig[k as keyof T] = true;
  }

  return {
    ...defaultConfig,
    ...config,
  };
};
