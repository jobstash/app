import { PRICING_SECTIONS, PRICING_TIERS } from './constants';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

export const PricingTable = () => (
  <div className="isolate mt-20 hidden lg:block">
    <div className="relative -mx-8">
      <table className="w-full table-fixed border-separate border-spacing-y-0 text-left px-8">
        <caption className="sr-only">Pricing plan comparison</caption>
        <TableHeader tiers={PRICING_TIERS} />
        <TableBody tiers={PRICING_TIERS} sections={PRICING_SECTIONS} />
      </table>
    </div>
  </div>
);
