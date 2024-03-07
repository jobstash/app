import { ErrorBoundaryProps } from '~/shared/core/types';

import { ErrorAction } from './error-action';
import { ErrorActionButton } from './error-action-button';

interface Props extends Partial<ErrorBoundaryProps> {
  onReset?: () => void;
}

export const InternalErrorResult = ({ onReset, reset }: Props) => {
  const text = {
    heading: HEADING_TEXT,
    message: MESSAGE_TEXT,
  };

  const img = {
    src: IMG_SRC,
  };

  const classNames = { image: IMAGE_CLASSNAME };

  const onClick = () => {
    if (reset) reset();
    if (onReset) onReset();
  };

  return (
    <ErrorAction
      textProps={text}
      imgProps={img}
      classNames={classNames}
      action={<ErrorActionButton onClick={onClick} />}
    />
  );
};

const IMG_SRC = '/vortex.png';

const IMAGE_CLASSNAME = 'animate-spin-slow';

const HEADING_TEXT = 'Serious Error';
const MESSAGE_TEXT =
  'All shortcuts have disappeared. Screen. Mind. Both are blank';
