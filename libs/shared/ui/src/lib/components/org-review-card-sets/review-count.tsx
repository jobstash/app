import CardSet from '../../base/card-set';

interface Props {
  isAuthd: boolean;
  hasReviewed: boolean;
  reviewCount: number;
  onClick: () => void;
}

const ReviewCount = ({ hasReviewed, isAuthd, reviewCount, onClick }: Props) => {
  let text = 'Edit Review';

  if (reviewCount > 0 && !isAuthd) {
    text = `Reviews: ${reviewCount}`;
  } else if (!isAuthd || !hasReviewed) {
    text = 'Leave a Review';
  }

  return (
    <CardSet icon={<ReviewIcon />} onClick={onClick}>
      {text}
    </CardSet>
  );
};

export default ReviewCount;

const ReviewIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 7.3125H11.25C11.5607 7.3125 11.8125 7.06066 11.8125 6.75C11.8125 6.43934 11.5607 6.1875 11.25 6.1875H6.75C6.43934 6.1875 6.1875 6.43934 6.1875 6.75C6.1875 7.06066 6.43934 7.3125 6.75 7.3125Z"
      fill="white"
    />
    <path
      d="M6.75 9.5625H11.25C11.5607 9.5625 11.8125 9.31066 11.8125 9C11.8125 8.68934 11.5607 8.4375 11.25 8.4375H6.75C6.43934 8.4375 6.1875 8.68934 6.1875 9C6.1875 9.31066 6.43934 9.5625 6.75 9.5625Z"
      fill="white"
    />
    <path
      d="M6.75 11.8125H9C9.31066 11.8125 9.5625 11.5607 9.5625 11.25C9.5625 10.9393 9.31066 10.6875 9 10.6875H6.75C6.43934 10.6875 6.1875 10.9393 6.1875 11.25C6.1875 11.5607 6.43934 11.8125 6.75 11.8125Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.375 15.75H11.017L11.018 15.75C11.018 15.75 11.2396 15.7504 11.4447 15.6662C11.4447 15.6662 11.6506 15.5816 11.8085 15.4245L15.4235 11.8095C15.4235 11.8095 15.5816 11.6506 15.6662 11.4447C15.6662 11.4447 15.7508 11.2387 15.75 11.016L15.75 3.375C15.75 3.375 15.75 2.90901 15.4205 2.57951C15.4205 2.57951 15.091 2.25 14.625 2.25H3.375C3.375 2.25 2.90901 2.25 2.5795 2.57951C2.5795 2.57951 2.25 2.90901 2.25 3.375V14.625C2.25 14.625 2.25 15.091 2.57951 15.4205C2.57951 15.4205 2.90901 15.75 3.375 15.75ZM14.625 11.017L11.017 14.625H3.375V3.375H14.625L14.625 11.017Z"
      fill="white"
    />
    <path
      d="M10.6875 11.25V15.1383C10.6875 15.4489 10.9393 15.7008 11.25 15.7008C11.5607 15.7008 11.8125 15.4489 11.8125 15.1383V11.8125H15.1383C15.4489 11.8125 15.7008 11.5607 15.7008 11.25C15.7008 10.9393 15.4489 10.6875 15.1383 10.6875H11.25C10.9393 10.6875 10.6875 10.9393 10.6875 11.25Z"
      fill="white"
    />
  </svg>
);
