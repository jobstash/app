import myzod, { type Type } from 'myzod';

export const validatePayload = <T>(data: unknown, schema: Type<T>) => {
  const result = schema.try(data);
  if (result instanceof myzod.ValidationError) {
    // Myzod has weird way of messaging
    const msgs = result.message.split(' - ');
    if (msgs.length > 1) {
      throw new Error(msgs[1]);
    }

    return;
  }

  return result;
};
