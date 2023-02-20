import { FilterAction, FilterState } from '../core/types';

export const filterReducer = (state: FilterState, action: FilterAction) => {
  const { type, payload } = action;

  // Clear action
  if (!type) return {};

  // The way everything's setup, action `type` maps 1:1 with payload keys
  return { ...state, [type]: payload };
};
