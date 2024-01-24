import { memo } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const title = 'You have no Organizations to Review';

const ProfileOrgReviewEmptyList = () => (
  <GotItCard
    icon={<ProfileReviewsEmptyIcon />}
    title={title}
    heading={
      <div className="pt-4">
        <Heading className="text-xl md:text-2xl">{title}</Heading>
      </div>
    }
  >
    <Text color="dimmed">
      We were unable to detect any past or present public development activity
      based on your github profile, and were unable to match your verified email
      with an organization in our database.
    </Text>

    <Text color="dimmed">
      We only allow verified past and current team members to leave a public
      anonymoyus review.
    </Text>
  </GotItCard>
);

export default memo(ProfileOrgReviewEmptyList);

const ProfileReviewsEmptyIcon = () => (
  <svg
    width="81"
    height="81"
    viewBox="0 0 81 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M78 78L3 3" stroke="white" strokeWidth="6" strokeLinecap="round" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M76.0474 21.6724L43.4224 54.2974C42.9126 54.8073 42.2211 55.0938 41.5 55.0938H30.625C29.1235 55.0938 27.9062 53.8765 27.9062 52.375V41.5C27.9062 40.7789 28.1927 40.0874 28.7026 39.5776L61.3276 6.95255C61.8374 6.44269 62.5289 6.15625 63.25 6.15625C63.9711 6.15625 64.6626 6.44269 65.1724 6.95255L76.0474 17.8276C77.1092 18.8893 77.1092 20.6107 76.0474 21.6724ZM63.25 12.7199L70.2801 19.75L40.3739 49.6562H33.3438V42.6261L63.25 12.7199Z"
      fill="white"
    />
    <path
      d="M64.0455 29.8278C64.5553 30.3377 65.2477 30.625 65.9688 30.625C66.0157 30.625 66.0626 30.6238 66.1094 30.6214C66.7809 30.5866 67.4157 30.3042 67.8912 29.8287C68.4011 29.3188 68.6875 28.6273 68.6875 27.9062C68.6875 27.1852 68.4011 26.4937 67.8912 25.9838L57.0162 15.1088C56.5063 14.5989 55.8148 14.3125 55.0938 14.3125C54.3727 14.3125 53.6812 14.5989 53.1713 15.1088C52.6614 15.6187 52.375 16.3102 52.375 17.0312C52.375 17.7523 52.6614 18.4438 53.1713 18.9537L64.0455 29.8278Z"
      fill="white"
    />
    <path
      d="M14.3125 14.3125H44.2188C45.7203 14.3125 46.9375 13.0953 46.9375 11.5938C46.9375 10.0922 45.7203 8.875 44.2188 8.875H14.3125C12.0602 8.875 10.4676 10.4676 10.4676 10.4676C8.875 12.0602 8.875 14.3125 8.875 14.3125V68.6875C8.875 70.9398 10.4676 72.5324 10.4676 72.5324C12.0602 74.125 14.3125 74.125 14.3125 74.125H68.6875C70.9398 74.125 72.5324 72.5324 72.5324 72.5324C74.125 70.9398 74.125 68.6875 74.125 68.6875V38.7812C74.125 37.2797 72.9078 36.0625 71.4062 36.0625C69.9047 36.0625 68.6875 37.2797 68.6875 38.7812V68.6875H14.3125V14.3125Z"
      fill="white"
    />
  </svg>
);
