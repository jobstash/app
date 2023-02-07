export interface SidebarTab {
  left: JSX.Element;
  label: string;
  baseHref:
    | '/jobs'
    | '/organizations'
    | '/projects'
    | '/repositories'
    | '/bookmarks/jobs'
    | '/bookmarks/orgs';
  intent: 'secondary';
}
