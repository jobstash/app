import { type ComponentSize } from '~/core/types';

import { Avatar } from './base/avatar';
import { Text } from './base/text';

interface Props {
  name: string;
  avatar: string;
  location?: string;

  // Size applied to avatar, name, location
  size: ComponentSize;

  // Options to overide size
  avatarSize?: ComponentSize;
  nameSize?: ComponentSize;
  locationSize?: ComponentSize;
}

export const LogoTitle = (props: Props) => {
  const { name, avatar, location, size, avatarSize, nameSize, locationSize } =
    props;

  return (
    <div className="flex items-center space-x-3">
      <Avatar src={avatar} alt={name} size={avatarSize ?? size} />
      <div className="flex flex-col">
        <Text size={nameSize ?? size} fw="medium" htmlTag="h2">
          {name}
        </Text>
        {location && (
          <Text color="dimmed" size={locationSize ?? 'sm'} htmlTag="h3">
            {location}
          </Text>
        )}
      </div>
    </div>
  );
};
