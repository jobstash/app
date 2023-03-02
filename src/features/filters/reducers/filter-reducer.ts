import type { FilterAction, FilterState } from '../core/types';

export const filterReducer = (state: FilterState, action: FilterAction) => {
  const { type, payload } = action;

  // Clear action
  if (!type) return {};

  if (!payload) {
    const _state = state;
    delete _state[type];
    return { ..._state };
  }

  // The way everything's setup, action `type` maps 1:1 with payload keys
  return { ...state, [type]: payload };
};
