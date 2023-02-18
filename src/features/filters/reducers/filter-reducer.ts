import { FilterAction, FilterState } from '../core/types';

export const filterReducer = (state: FilterState, action: FilterAction) => {
  const { type, payload } = action;

  // The way everything's setup, action `type` maps 1:1 with payload keys
  return { ...state, [type]: payload };
};
