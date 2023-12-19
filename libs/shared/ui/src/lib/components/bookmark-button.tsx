import { useState } from 'react';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import CardSet from '../base/card-set';

import Spinner from './spinner';

interface Props {
  isBookmarked: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const BookmarkButton = ({
  isBookmarked,
  isLoading,
  isDisabled,
  onClick,
}: Props) => {
  const { isAuthd, roleClick } = useRoleClick(CHECK_WALLET_ROLES.DEV, () => {
    if (onClick) {
      setBookmarked((prev) => !prev);
      onClick();
    }
  });

  const [bookmarked, setBookmarked] = useState(isBookmarked);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex items-center justify-center h-6 w-6">
      <CardSet
        icon={isAuthd && bookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
        className="px-[3px]"
        isDisabled={isDisabled}
        onClick={roleClick}
      >
        {null}
      </CardSet>
    </div>
  );
};

export default BookmarkButton;

const BookmarkIcon = () => (
  <div className="flex items-center justify-center w-5 h-5">
    <svg
      width="13.5"
      height="17.75"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.75 2.125V18.625C13.75 19.0392 13.4142 19.375 13 19.375C12.8594 19.375 12.7217 19.3355 12.6025 19.261L7 15.7594L1.3975 19.261C1.04625 19.4805 0.583534 19.3737 0.364001 19.0225C0.289502 18.9033 0.25 18.7656 0.25 18.625V2.125C0.25 2.125 0.25 1.50368 0.68934 1.06434C0.68934 1.06434 1.12868 0.625 1.75 0.625H12.25C12.25 0.625 12.8713 0.625 13.3107 1.06434C13.3107 1.06434 13.75 1.50368 13.75 2.125ZM12.25 2.125H1.75V17.2718L6.6025 14.239C6.8457 14.087 7.1543 14.087 7.3975 14.239L12.25 17.2718V2.125Z"
        fill="#F9FAFB"
      />
    </svg>
  </div>
);

const BookmarkedIcon = () => (
  <div className="flex items-center justify-center w-6 h-6">
    <svg
      width="16"
      height="28"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.75 2.125V18.625C13.75 19.0392 13.4142 19.375 13 19.375C12.8594 19.375 12.7217 19.3355 12.6025 19.261L7 15.7594L1.3975 19.261C1.04625 19.4805 0.583534 19.3737 0.364001 19.0225C0.289502 18.9033 0.25 18.7656 0.25 18.625V2.125C0.25 2.125 0.25 1.50368 0.68934 1.06434C0.68934 1.06434 1.12868 0.625 1.75 0.625H12.25C12.25 0.625 12.8713 0.625 13.3107 1.06434C13.3107 1.06434 13.75 1.50368 13.75 2.125Z"
        fill="#F9FAFB"
      />
    </svg>
  </div>
);
