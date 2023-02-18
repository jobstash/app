import {
  KEY_AUDITS,
  KEY_EMPLOYEE_COUNT,
  KEY_HACKS,
  KEY_LEVEL,
  KEY_MONTHLY_ACTIVE_USERS,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_VOLUME,
  KEY_PUBLICATION_DATE,
  KEY_SALARY,
  KEY_TEAM_SIZE,
  KEY_TVL,
} from '../core/constants';
import {
  DatePayload,
  FilterAction,
  FilterState,
  LevelPayload,
  RangePayload,
} from '../core/types';

export const filterReducer = (state: FilterState, action: FilterAction) => {
  const { type, payload } = action;

  // The way everything's setup, action `type` maps 1:1 with payload keys
  switch (type) {
    case KEY_LEVEL: {
      return { ...state, [type]: payload as LevelPayload };
    }

    case KEY_PUBLICATION_DATE: {
      return { ...state, [type]: payload as DatePayload };
    }

    case KEY_SALARY:
    case KEY_TEAM_SIZE:
    case KEY_EMPLOYEE_COUNT:
    case KEY_TVL:
    case KEY_MONTHLY_VOLUME:
    case KEY_MONTHLY_ACTIVE_USERS:
    case KEY_MONTHLY_REVENUE:
    case KEY_AUDITS:
    case KEY_HACKS: {
      return { ...state, [type]: payload as RangePayload };
    }

    default: {
      throw new Error(`Filter action type = "${type}" does not exist`);
    }
  }
};
