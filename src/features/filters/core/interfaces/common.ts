import { RangeValue } from '../types';

export interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  prefix: string;
  value: RangeValue;
  defaultValue: RangeValue;
}
