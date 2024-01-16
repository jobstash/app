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
    className="w-full lg:w-[352px] [&>*]:w-full"
  >
    {children}
  </div>
);

export default AccountCardWrapper;
