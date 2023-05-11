export const createOrgTags = () => {};

//
// import { TagIcon } from '~/shared/components';
// import type { OrgPost, TagElement } from '~/shared/core/interfaces';

// export const createOrgTags = (post: OrgPost): TagElement[] => {
//   const { jobs, projects, details } = post;

//   const { teamSize, funding } = details;

//   const tags: TagElement[] = [
//     {
//       text: `Team Size: ${teamSize}`,
//       icon: <TagIcon filename="users-three" />,
//     },
//     {
//       text: `Funding: ${funding.date}`,
//       icon: <TagIcon filename="funding" />,
//     },
//   ];

//   if (projects.length > 0) {
//     tags.unshift({
//       text: `Projects: ${projects.length}`,
//       icon: <TagIcon filename="code" />,
//     });
//   }

//   if (jobs.length > 0) {
//     tags.unshift({
//       text: `Jobs: ${jobs.length}`,
//       icon: <TagIcon filename="suitcase" />,
//     });
//   }

//   return tags;
// };
