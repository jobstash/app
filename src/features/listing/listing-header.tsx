import { Text } from '../unstyled-ui/base/text';
import { BookmarkButton } from '../unstyled-ui/bookmark-button';
import { LogoTitle } from '../unstyled-ui/logo-title';

interface Props {
  title: string;
  recent: string;
  avatar?: string;
  location?: string;
}

/**
 * UI for listing header
 * 	components: title, recent
 * 	optional components: avatar, location
 * */
export const ListingHeader = ({ title, recent, avatar, location }: Props) => (
  <div className="flex justify-between">
    {avatar ? (
      <LogoTitle avatar={avatar} name={title} location={location} size="lg" />
    ) : (
      <Text htmlTag="h1" size="xl" fw="semibold" className="text-white/90">
        {title}
      </Text>
    )}

    <div className="flex items-center space-x-4">
      <Text htmlTag="h3" size="md" fw="regular" className="text-white/80">
        {recent}
      </Text>
      <BookmarkButton />
    </div>
  </div>
);
