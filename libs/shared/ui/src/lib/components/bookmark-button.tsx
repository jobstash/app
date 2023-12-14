import { MouseEventHandler } from 'react';

import Button from '../base/button/button';

import Spinner from './spinner';

interface Props {
  isLoading?: boolean;
  onClick?: () => void;
}

const BookmarkButton = ({ isLoading, onClick }: Props) => {
  const onClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Button
      isIcon
      variant="translucent"
      size="sm"
      isDisabled={isLoading}
      onClick={onClickHandler}
    >
      <BookmarkIcon />
    </Button>
  );
};

export default BookmarkButton;

const BookmarkIcon = () => (
  <svg
    width="28"
    height="26"
    viewBox="0 0 28 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="28" height="26" rx="4" fill="white" fillOpacity="0.1" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.75 5.125V21.625C20.75 22.0392 20.4142 22.375 20 22.375C19.8594 22.375 19.7217 22.3355 19.6025 22.261L14 18.7594L8.3975 22.261C8.04625 22.4805 7.58353 22.3737 7.364 22.0225C7.2895 21.9033 7.25 21.7656 7.25 21.625V5.125C7.25 5.125 7.25 4.50368 7.68934 4.06434C7.68934 4.06434 8.12868 3.625 8.75 3.625H19.25C19.25 3.625 19.8713 3.625 20.3107 4.06434C20.3107 4.06434 20.75 4.50368 20.75 5.125ZM19.25 5.125H8.75V20.2718L13.6025 17.239C13.8457 17.087 14.1543 17.087 14.3975 17.239L19.25 20.2718V5.125Z"
      fill="#F9FAFB"
    />
  </svg>
);
