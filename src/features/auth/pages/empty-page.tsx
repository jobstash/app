import clsx from 'clsx';

import { Text } from '~/shared/components';

import { CenteredLayout } from '../layouts/centered-layout';

interface Props {
  isLoading?: boolean;
}

const EmptyPage = ({ isLoading }: Props) => (
  <CenteredLayout isLoading={isLoading}>{null}</CenteredLayout>
);

export default EmptyPage;
