const START_COLOR = '#1f1f28';
const END_COLOR = '#4e4e4e';
const BASE_BACKGROUND_COLOR = '#191919';
const TRANSPARENT_BORDER = '2px solid transparent';
const BASE_BACKGROUND_GRADIENT_DIRECTION = '90deg';
const BORDER_GRADIENT_DIRECTION = '330deg';

export const getGradientBorderStyle = (): React.CSSProperties => ({
  background: `linear-gradient(${BASE_BACKGROUND_GRADIENT_DIRECTION}, ${BASE_BACKGROUND_COLOR}, ${BASE_BACKGROUND_COLOR}) padding-box, linear-gradient(${BORDER_GRADIENT_DIRECTION}, ${START_COLOR}, ${END_COLOR}) border-box`,
  border: TRANSPARENT_BORDER,
});
