import React, { memo } from 'react';

import { Text } from '@jobstash/shared/ui';

import DonateDataItem from './donate-data-item';

interface DonateDataListProps {
  data: Array<{
    title: string;
    link: string;
    date: string;
  }>;
}

const DonateDataList: React.FC<DonateDataListProps> = ({ data }) => (
  <div className="flex flex-col gap-2">
    <div className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(200px,1.2fr)_minmax(250px,2fr)_100px] items-center gap-4 px-4 py-2 border-b border-white/10">
      <Text size="md" color="dimmed" fw="semibold">
        Name
      </Text>
      <Text
        size="md"
        color="dimmed"
        fw="semibold"
        className="text-left hidden md:block px-2"
      >
        Link
      </Text>
      <Text size="md" color="dimmed" fw="semibold" className="text-right pr-4">
        Date
      </Text>
    </div>

    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#141317] to-transparent pointer-events-none z-10" />

      {/* Scrollable content */}
      <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/30 pt-2 pb-8 px-4 overflow-x-hidden">
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <DonateDataItem
              key={item.link}
              title={item.title}
              link={item.link}
              date={item.date}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#141317] to-transparent pointer-events-none z-10" />
    </div>
  </div>
);

export default memo(DonateDataList);
