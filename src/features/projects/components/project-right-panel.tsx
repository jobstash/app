export const ProjectRightPanel = () => <div>ProjectRightPanel</div>;

//
// import Image from 'next/image';

// import { createProjectTags } from '~/features/projects/utils';
// import { TagIcon } from '~/shared/components/icons';
// import type { ProjectPost } from '~/shared/core/interfaces';

// const TEXT_TECHNOLOGIES_DESC =
//   'Uncover the technical skills and tools employed by the company, and gain insight into the technologies that dive their success.';

// interface Props {
//   project: ProjectPost['details'];
// }

// export const ProjectRightPanel = ({ project }: Props) => {
//   if (!project) return null;

//   const { name, avatar, description, chains, techs } = project;

//   const tags = createProjectTags(project);

//   return (
//     <div className="p-6">
//       <div className="flex">
//         <Image
//           src={avatar}
//           width="32"
//           height="32"
//           alt={name}
//           className="mr-2"
//         />
//         <h3 className="font-semibold">{name}</h3>
//         <p>{name}</p>
//         <p>{avatar}</p>
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         <p>Description</p>
//         <p>{description}</p>
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         {tags.top.map((tag) => (
//           <div key={tag.text}>
//             {tag.icon}
//             <p>{tag.text}</p>
//             <p>{tag.link}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         {tags.mid.map((tag) => (
//           <div key={tag.text}>
//             {tag.icon}
//             <p>{tag.text}</p>
//             <p>{tag.link}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         {tags.bottom.map((tag) => (
//           <div key={tag.text}>
//             {tag.icon}
//             <p>{tag.text}</p>
//             <p>{tag.link}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         <TagIcon filename="chain" />
//         <p>Chains: </p>
//         {chains.map((chain) => (
//           <div key={chain.name}>
//             <p>{chain.name}</p>
//             <p>{chain.avatar}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex items-center border-t border-white/5">
//         <p>Technologies</p>
//         <div>
//           <p>{TEXT_TECHNOLOGIES_DESC}</p>
//         </div>

//         <div>
//           {techs.map((tech) => (
//             <div key={tech.name}>
//               <p>{tech.name}</p>
//               <p>{tech.isChecked}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
