import { RangeValue } from '../types';

export interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: RangeValue;
  defaultValue: RangeValue;
}
