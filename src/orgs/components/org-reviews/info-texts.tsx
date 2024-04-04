import { Text } from '~/shared/components/text';

export const InfoTexts = () => {
  return (
    <>
      {INFO_TEXTS.map((text, i) => (
        <Text key={i} text={text} />
      ))}
    </>
  );
};

const INFO_TEXTS = [
  'Only devs associated with the org can review it.',
  "If you know anyone who works or worked here here, please invite them to review this organization. It's easy: Share the link above with them!",
];
