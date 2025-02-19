import { Tier } from './types';

interface Props {
  tiers: Tier[];
}

export const TableHeader = ({ tiers }: Props) => (
  <>
    <colgroup>
      <col className="w-1/4" />
      {tiers.map((tier) => (
        <col key={tier.id} className="w-1/4" />
      ))}
    </colgroup>
    <thead>
      <tr>
        <td />
        {tiers.map((tier) => (
          <th key={tier.id} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
            <div className="text-sm/7 font-semibold text-gray-900">
              {tier.name}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  </>
);
