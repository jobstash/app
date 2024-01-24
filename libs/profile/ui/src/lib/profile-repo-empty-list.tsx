import { memo } from 'react';

import { Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const ProfileRepoEmptyList = () => (
  <GotItCard
    icon={<ProfileRepoEmptyIcon />}
    title="No Publicly Relevant Repositories to Describe"
  >
    <Text color="dimmed">
      We were unable to detect any publicly interesting repositories based on
      your public GitHub activity.
    </Text>
    <Text color="dimmed">
      We only allow users to describe their contributions to public repositories
      that are part of the Electric Capital dataset, and this includes
      repositories for &gt; 4.5k organizations.
    </Text>
    <Text color="dimmed">
      We will soon allow for repositories that are deemed as interesting by
      other developers to be included in this list, so check back soon!
    </Text>
  </GotItCard>
);

export default memo(ProfileRepoEmptyList);

const ProfileRepoEmptyIcon = () => (
  <svg
    width="81"
    height="81"
    viewBox="0 0 81 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M78 78L3 3" stroke="white" strokeWidth="6" strokeLinecap="round" />
    <path
      d="M38.5469 65.5312V49.2188C38.5469 47.7172 37.3296 46.5 35.8281 46.5C34.3266 46.5 33.1094 47.7172 33.1094 49.2188V65.5312C33.1139 66.6234 32.7025 67.6227 32.7025 67.6227C32.291 68.622 31.5268 69.3862 31.5268 69.3862C30.7626 70.1504 29.7633 70.5618 29.7633 70.5618C28.764 70.9733 27.6833 70.9688 27.6833 70.9688L27.6719 70.9688C27.5097 70.9688 27.3479 70.9833 27.1884 71.0121L24.9531 73.6761C24.953 73.7197 24.9538 73.7632 24.9557 73.8067C24.9854 74.4819 25.2655 75.1219 25.7414 75.6019C26.2491 76.1139 26.9394 76.4032 27.6605 76.4062L27.6719 76.4063C29.834 76.4132 31.8336 75.5898 31.8336 75.5898C33.8385 74.7642 35.3717 73.2311 35.3717 73.2311C36.9049 71.6979 37.7304 69.693 37.7304 69.693C38.5559 67.6881 38.5469 65.5312 38.5469 65.5312Z"
      fill="white"
    />
    <path
      d="M52.1407 65.5312V49.2188C52.1407 47.7172 50.9235 46.5 49.422 46.5C47.9204 46.5 46.7032 47.7172 46.7032 49.2188V65.5312C46.6942 67.6881 47.5197 69.693 47.5197 69.693C48.3452 71.6979 49.8784 73.2311 49.8784 73.2311C51.4116 74.7642 53.4165 75.5898 53.4165 75.5898C55.4161 76.4131 57.5782 76.4063 57.5782 76.4063L57.5896 76.4062C59.0867 76.3999 60.297 75.1846 60.297 73.6875L60.297 73.678C60.2907 72.1809 59.0753 70.9688 57.5782 70.9688L57.5687 70.9688C56.488 70.9733 55.4868 70.5618 55.4868 70.5618C54.4875 70.1504 53.7233 69.3862 53.7233 69.3862C52.9591 68.622 52.5476 67.6227 52.5476 67.6227C52.1362 66.6234 52.1407 65.5312 52.1407 65.5312Z"
      fill="white"
    />
    <path
      d="M72.5406 70.9688C73.2617 70.9658 73.954 70.6764 74.4617 70.1644C74.9667 69.6553 75.25 68.9672 75.25 68.2501L75.25 68.2422L75.25 68.2387C75.2437 66.7416 74.0283 65.5313 72.5312 65.5313L72.5217 65.5313C71.441 65.5359 70.4398 65.1244 70.4398 65.1244C69.4405 64.7129 68.6763 63.9487 68.6763 63.9487C67.9122 63.1846 67.5007 62.1852 67.5007 62.1852C67.0892 61.1859 67.0937 60.1052 67.0937 60.1052L67.0938 57.3751C67.1028 55.2183 66.2773 53.2134 66.2773 53.2134C65.4517 51.2084 63.9186 49.6753 63.9186 49.6753C62.3854 48.1421 60.3805 47.3166 60.3805 47.3166C58.3756 46.491 56.2074 46.5001 56.2074 46.5001L50.7812 46.5001C49.2797 46.5001 48.0625 47.7173 48.0625 49.2188C48.0625 50.7203 49.2797 51.9376 50.7812 51.9376L56.2301 51.9376C57.3109 51.933 58.3102 52.3445 58.3102 52.3445C59.3095 52.756 60.0737 53.5202 60.0737 53.5202C60.8378 54.2843 61.2493 55.2837 61.2493 55.2837C61.6608 56.283 61.6562 57.3751 61.6562 57.3751L61.6563 60.0824C61.6472 62.2506 62.4727 64.2556 62.4727 64.2556C63.2983 66.2605 64.8314 67.7936 64.8314 67.7936C66.3646 69.3268 68.3695 70.1524 68.3695 70.1524C70.3692 70.9757 72.5312 70.9688 72.5312 70.9688L72.5374 70.9688L72.5406 70.9688Z"
      fill="white"
    />
    <path
      d="M14.8102 65.1244C13.8109 65.5359 12.7301 65.5313 12.7301 65.5313L12.7188 65.5313C12.5566 65.5313 12.3948 65.5458 12.2353 65.5747L10 68.2387C9.99984 68.2822 10.0007 68.3258 10.0026 68.3693C10.0323 69.0445 10.3123 69.6845 10.7883 70.1644C11.296 70.6764 11.9863 70.9658 12.7074 70.9688L12.7188 70.9688C14.8808 70.9757 16.8805 70.1524 16.8805 70.1524C18.8854 69.3268 20.4186 67.7936 20.4186 67.7936C21.9517 66.2605 22.7773 64.2556 22.7773 64.2556C23.6028 62.2506 23.5937 60.0824 23.5937 60.0824L23.5938 57.3751C23.5892 56.283 24.0007 55.2837 24.0007 55.2837C24.4122 54.2843 25.1763 53.5202 25.1763 53.5202C25.9405 52.756 26.9398 52.3445 26.9398 52.3445C27.9391 51.933 29.0199 51.9376 29.0199 51.9376L34.4688 51.9376C35.9703 51.9376 37.1875 50.7203 37.1875 49.2188C37.1875 47.7173 35.9703 46.5001 34.4688 46.5001L29.0426 46.5001C26.8744 46.491 24.8695 47.3166 24.8695 47.3166C22.8646 48.1421 21.3314 49.6753 21.3314 49.6753C19.7983 51.2084 18.9727 53.2134 18.9727 53.2134C18.1472 55.2183 18.1562 57.3751 18.1562 57.3751L18.1563 60.1052C18.1608 61.1859 17.7493 62.1852 17.7493 62.1852C17.3379 63.1846 16.5737 63.9487 16.5737 63.9487C15.8095 64.7129 14.8102 65.1244 14.8102 65.1244Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.2233 5.50854C53.2233 5.50854 49.3228 7.6458 46.7059 11.1562H38.5441C38.5441 11.1562 35.9272 7.64581 32.0267 5.50854C32.0267 5.50854 27.4519 3.00179 22.2353 3C21.2639 2.99967 20.3662 3.51762 19.8802 4.35872C19.8802 4.35872 17.5685 8.36015 17.2078 12.9672C17.2078 12.9672 16.902 16.8729 18.049 20.5668C18.049 20.5668 15.4772 24.9726 15.4376 30.1668L15.4375 32.9062C15.4375 32.9062 15.4375 40.7893 21.0116 46.3634C21.0116 46.3634 26.5857 51.9376 34.4688 51.9376H50.7812C50.7812 51.9376 58.6643 51.9375 64.2384 46.3634C64.2384 46.3634 69.8125 40.7893 69.8125 32.9062V30.1875C69.8125 30.1875 69.7728 24.975 67.201 20.567C67.201 20.567 68.348 16.873 68.0422 12.9672C68.0422 12.9672 67.6815 8.36015 65.3698 4.35872C64.8838 3.51762 63.9861 2.99967 63.0147 3C63.0147 3 57.7981 3.00179 53.2233 5.50854ZM48.1305 16.5938H37.1195C36.1918 16.5938 35.3281 16.1207 34.8286 15.3389C34.8286 15.3389 32.7687 12.1154 29.4138 10.2771C29.4138 10.2771 26.7785 8.83311 23.8529 8.52258C23.8529 8.52258 22.8293 10.8294 22.6287 13.3917C22.6287 13.3917 22.3642 16.7702 23.582 19.9327C23.9021 20.7638 23.7948 21.699 23.2948 22.436C23.2948 22.436 20.9074 25.9555 20.8749 30.2082L20.875 32.9062C20.875 32.9062 20.875 38.537 24.8565 42.5185C24.8565 42.5185 28.838 46.5001 34.4688 46.5001H50.7812C50.7812 46.5001 56.412 46.5 60.3935 42.5185C60.3935 42.5185 64.375 38.537 64.375 32.9062V30.1875C64.375 30.1875 64.3426 25.9555 61.9552 22.436C61.4552 21.699 61.3479 20.7638 61.668 19.9327C61.668 19.9327 62.8858 16.7702 62.6213 13.3917C62.6213 13.3917 62.4207 10.8294 61.3971 8.52258C61.3971 8.52258 58.4715 8.83311 55.8362 10.2771C55.8362 10.2771 52.4813 12.1154 50.4214 15.3389C49.9219 16.1207 49.0582 16.5938 48.1305 16.5938Z"
      fill="white"
    />
  </svg>
);
