export const normalizePayload = <T extends object>(payload: T): T => {
  const normalized = { ...payload };

  for (const key of Object.keys(normalized)) {
    const typedKey = key as keyof T;
    const value = normalized[typedKey];

    if (typeof value === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-expect-error */
      normalized[typedKey] = value.trim();
    }
  }

  return normalized;
};
