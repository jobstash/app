import Heading from './heading';

export interface CardHeadingProps {
  children: string;
}

export const CardHeading = ({ children }: CardHeadingProps) => (
  <Heading size="md">{children}</Heading>
);
