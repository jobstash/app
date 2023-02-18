import { Dispatch } from 'react';

import { FilterAction, FilterState, MultiSelectItem } from '../core/types';

export const toggleMultiSelectItem = (
  { label: selectedLabel, isChecked: selectedIsChecked }: MultiSelectItem,
  items: MultiSelectItem[],
  type: keyof FilterState,
  dispatch: Dispatch<FilterAction>,
) => {
  const newItem: MultiSelectItem = {
    label: selectedLabel,
    isChecked: selectedIsChecked,
  };
  const exists = items.some(({ label }) => label === selectedLabel);
  if (exists) {
    const updated = items.map((item) =>
      item.label === selectedLabel ? newItem : item,
    );
    return dispatch({ type, payload: updated });
  }

  return dispatch({
    type,
    payload: [...items, { label: selectedLabel, isChecked: selectedIsChecked }],
  });
};
