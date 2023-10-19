import { Select, TextInput } from '@mantine/core';

import { Button, Heading, Text } from '@jobstash/shared/ui';

const SHOWCASE_OPTIONS = ['CV', 'Portfolio', 'Website'];

const ProfileDevInfoShowcase = () => (
  <div className="flex flex-col border border-white/10 rounded-3xl bg-dark p-6 gap-4">
    <Heading size="md">Showcase Your Work</Heading>
    <Text color="dimmed">
      Add link to your CV, Portfolio or Website and increase the chance of
      getting hired.
    </Text>

    <div className="flex gap-4">
      <Select
        searchable
        creatable
        data={SHOWCASE_OPTIONS}
        placeholder="Select ..."
        getCreateLabel={(query) => `+ Other: ${query}`}
        size="lg"
        classNames={{
          input:
            'rounded-lg bg-dark-gray text-white text-lg placeholder:text-white placeholder:text-lg focus:border-white/40',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
      />
      <div className="flex-grow">
        <TextInput
          disabled
          placeholder="Enter URL Link"
          size="lg"
          classNames={{
            input:
              'rounded-lg bg-dark-gray text-white text-lg placeholder:text-white/60 placeholder:text-lg focus:border-white/40',
          }}
        />
      </div>
    </div>

    <Button variant="outline" size="sm">
      Add Another
    </Button>
  </div>
);

export default ProfileDevInfoShowcase;
