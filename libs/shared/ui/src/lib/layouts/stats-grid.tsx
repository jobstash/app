import { Group, Paper, SimpleGrid, Text, createStyles } from '@mantine/core';
import { UsersIcon, EyeIcon, CursorArrowRippleIcon, CalendarIcon } from '@heroicons/react/24/outline';

const icons = {
  users: UsersIcon,
  eye: EyeIcon,
  app: CursorArrowRippleIcon,
  calendar: CalendarIcon
};

const data = [
  { title: 'Monthly Active Users', icon: 'users', value: '13,456', diff: 34 },
  { title: 'Monthly Views', icon: 'eye', value: '4,145', diff: -13 },
  { title: 'Applications Per Month', icon: 'app', value: '745', diff: 18 },
  { title: 'Applicants Per Month', icon: 'calendar', value: '188', diff: -30 },
] as const;

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl}px * 1.5)`,
  },
  value: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
    lineHeight: 1,
  },
  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export function StatsGrid() {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder p="md" radius="md" key={stat.title} className={classes.root}>
        <Group className='justify-between'>
          <Text size="xs" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={`self-end w-5 ${classes.icon}`} />
        </Group>

        <Group align="flex-end" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text className={classes.diff} style={{ color: stat.diff > 0 ? 'teal' : 'red' }}>
            <span>{stat.diff}%</span>
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      {stats}
    </SimpleGrid>
  );
}
