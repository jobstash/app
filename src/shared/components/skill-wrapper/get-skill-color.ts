const N = 12; // Should match number of skill-colors in tailwind config
const DEFAULT_N = 1; // Defaults to first palette

const getColorIndex = (uuid: string) => {
  let pseudorandomBytes =
    uuid.slice(0, 14) + uuid.slice(15, 19) + uuid.slice(20);
  pseudorandomBytes = pseudorandomBytes.replaceAll('-', '');

  let accumulator = DEFAULT_N;

  // Regex should match number of skill-colors (12) so {1,12}
  const pseudoMatch = pseudorandomBytes.match(/.{1,12}/g);
  if (!pseudoMatch) return DEFAULT_N;

  for (const a of pseudoMatch) {
    accumulator = (accumulator + (Number.parseInt(a, 16) % N)) % N;
  }

  return accumulator;
};

export const getSkillColor = (uuid: string) => `skill${getColorIndex(uuid)}`;
