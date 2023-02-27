export const RepoRightPanel = () => <div>RepoRightPanel</div>;

//
// import { createRepoTags } from '~/features/repos/utils';
// import { Button, IconDevs, IconGithub } from '~/shared/components';
// import type { RepoPost } from '~/shared/core/interfaces';

// interface Props {
//   repo: RepoPost['details'];
// }

// export const RepoRightPanel = ({ repo }: Props) => {
//   if (!repo) return null;

//   const { name, description, devInfos } = repo;

//   const tags = createRepoTags(repo);

//   return (
//     <div className="p-6">
//       <div>
//         <div>
//           <IconGithub />
//           <p>{name}</p>
//         </div>
//         <Button>bookmark</Button>
//       </div>

//       <hr />

//       <div>
//         {tags.map((tag) => (
//           <div key={tag.text}>
//             {tag.icon}
//             <p>{tag.text}</p>
//             <p>{tag.link}</p>
//           </div>
//         ))}
//       </div>

//       <div>
//         <p>{description}</p>
//       </div>

//       <div>
//         {devInfos.map((devInfo) => (
//           <div key={devInfo.techs.map((tech) => tech.name).join('')}>
//             <div>
//               <IconDevs />
//               <p>Devs: {devInfo.devCount}</p>
//             </div>
//             {devInfo.techs.map((tech) => (
//               <div key={tech.name}>
//                 <p>{tech.name}</p>
//                 <p>{tech.isChecked}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
