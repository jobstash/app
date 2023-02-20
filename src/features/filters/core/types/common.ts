export type RangeValue = [number, number];

export type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  value: RangeValue;
  defaultValue: RangeValue;
};
