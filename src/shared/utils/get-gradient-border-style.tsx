import React from 'react';

export const getGradientBorderStyle = (
  isPrimary = true,
): React.CSSProperties => {
  const color1 = isPrimary ? '#8743FF' : '#363638';
  const color2 = isPrimary ? '#4136F1' : '#27272A';

  return {
    background: `linear-gradient(90deg, #1e1e1e, #1e1e1e) padding-box, linear-gradient(270deg, ${color1}, ${color2}) border-box`,
    border: '2px solid transparent',
  };
};
