export const RepoCard = () => <div>RepoCard</div>;

//
// import type { MouseEventHandler } from 'react';

// import { cva } from 'class-variance-authority';

// import {
//   Button,
//   CardHeading,
//   ChainHeading,
//   IconHolder,
//   SkillHolder,
// } from '~/shared/components';
// import type { RepoPost } from '~/shared/core/interfaces';

// import { createRepoTags, getRepoTechs } from '../utils';

// const cvaRepoCard = cva(
//   [
//     'w-full overflow-hidden rounded-3xl bg-white/5 p-6 text-ivory cursor-pointer relative transition-all',
//     'hover:bg-white/20 after:transition-all	 after:content-[""] after:hidden after:h-full after:border after:border-white after:rounded-3xl after:w-full after:absolute after:inset-0 hover:after:block after:z-20',
//   ],
//   {
//     variants: {
//       isActive: {
//         true: 'bg-gradient-to-l from-primary to-secondary hover:after:hidden cursor-default',
//       },
//     },
//   },
// );

// interface Props {
//   post: RepoPost;
//   isActive: boolean;
//   onClick: MouseEventHandler;
// }

// export const RepoCard = ({ post, isActive, onClick }: Props) => {
//   const { details, created, org } = post;

//   const { name, description } = details;

//   const tags = createRepoTags(details);
//   const techs = getRepoTechs(details);

//   return (
//     <div className={cvaRepoCard({ isActive })} onClick={onClick}>
//       <div className="flex items-center justify-between">
//         <CardHeading>{name}</CardHeading>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm">{created}</span>
//           <Button>bookmark</Button>
//         </div>
//       </div>
//       <p className="mt-2 mb-3 text-sm">{description}</p>
//       <div className="flex space-x-8 border-b border-white/5 pb-4 text-sm">
//         {tags.map((tag) => (
//           <IconHolder
//             key={tag.text}
//             className=""
//             link={tag.link}
//             icon={tag.icon}
//           >
//             {tag.text}
//           </IconHolder>
//         ))}
//       </div>

//       <div className="flex py-4">
//         <div className="-mb-3 flex grow flex-wrap">
//           {techs.map((tech) => (
//             <SkillHolder key={tech.name} isChecked className="mr-4">
//               {tech.name}
//             </SkillHolder>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
//         <ChainHeading avatar={org.avatar} alt={org.name}>
//           {org.name}
//         </ChainHeading>
//       </div>
//     </div>
//   );
// };
