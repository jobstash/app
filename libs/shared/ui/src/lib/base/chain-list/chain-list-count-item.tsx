import { getPluralText } from '@jobstash/shared/utils';

import Text from '../text';

import ChainListTooltip from './chain-list-tooltip';

interface Props {
  count: number;
}

const ChainListCountItem = ({ count }: Props) => (
  <ChainListTooltip label={`+${count} other ${getPluralText('chain', count)}`}>
    <div className="z-10 bg-[#E5ECF6] flex items-center justify-center w-6 h-6 min-w-[26px] min-h-[26px] rounded-3xl py-[2.5px] -ml-[8px]">
      <Text
        fw="medium"
        size="sm"
        className="text-dark-gray"
      >{`+${count}`}</Text>
    </div>
  </ChainListTooltip>
);

export default ChainListCountItem;
