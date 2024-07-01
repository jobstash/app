import { useState } from 'react';

import { Button, Input } from '@nextui-org/react';

import { capitalize, notifError } from '@jobstash/shared/utils';

const FIELDS = [
  'email',
  'discord',
  'telegram',
  'farcaster',
  'lens',
  'twitter',
  'city',
  'country',
];

interface FormData {
  email: string;
  discord: string;
  telegram: string;
  farcaster: string;
  lens: string;
  twitter: string;
}

export const ProfileHeaderContactInfo = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    discord: '',
    telegram: '',
    farcaster: '',
    lens: '',
    twitter: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data Submitted:', formData);

    const isAnyFieldFilled = Object.values(formData).some(
      (field) => field.trim() !== '',
    );

    if (!isAnyFieldFilled) {
      notifError({
        title: 'Submission Failed!',
        message: 'Please fill at least one field to save your contact info',
      });
    }
  };

  return (
    <form
      className="grid md:grid-cols-2 gap-6 pt-0 p-2 pb-4"
      onSubmit={handleSubmit}
    >
      {FIELDS.map((name, i) => (
        <div key={name} className="h-10 min-h-[40px]">
          <Input
            name={name}
            label={capitalize(name)}
            size="sm"
            onChange={handleChange}
          />
        </div>
      ))}
      <Button type="submit" className="w-fit">
        Save
      </Button>
    </form>
  );
};
