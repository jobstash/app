import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AccountCardWrapper = ({ children }: Props) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '28px',
      background:
        'linear-gradient(#141317, #121216) padding-box, linear-gradient(225deg, #8742ff, #663df9, #4136f1) border-box',
      border: '2px solid transparent',
      borderRadius: '1.5rem',
      gap: '1rem',
    }}
    className="flex mb-10 [&>*]:w-full [&_button]:max-w-[250px] [&_button]:mx-auto mx-2"
  >
    {children}
  </div>
);

export default AccountCardWrapper;
