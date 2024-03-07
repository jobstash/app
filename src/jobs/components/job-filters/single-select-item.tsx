import { SingleSelectFilterConfig } from '~/filters/core/schemas';

import { SingleSelectInput } from './single-select-input';

interface Props {
  config: SingleSelectFilterConfig;
  urlFilterParams: URLSearchParams;
}

// Convenience for select input component not to rerender on route change
// Rerender occurs when using useSearchParams hook which listens to router
// Selecting jobs always changes the route - so use SSR params value instead
export const SingleSelectItem = ({ config, urlFilterParams }: Props) => {
  const { paramKey, options } = config;

  const paramValue = urlFilterParams.get(paramKey) ?? '';

  // Find option with corresponding value
  const option = options.find((option) => option.value === paramValue);

  // Initial value for select component is the label for the paramValue
  const initValue = option?.label ?? '';

  return <SingleSelectInput config={config} initValue={initValue} />;
};
