import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../core/constants';
import { FilterConfig } from '../core/interfaces';

export const fakeFilterConfig = (): FilterConfig => ({
  publicationDate: {
    position: 1,
    label: 'Publication Date',
    show: true,
    paramKey: 'publication_date',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'Today',
        value: 'today',
      },
      {
        label: 'Last week',
        value: 'last week',
      },
      {
        label: 'Last month',
        value: 'last month',
      },
      {
        label: 'Last quarter',
        value: 'last quarter',
      },
      {
        label: 'Last year',
        value: 'last year',
      },
    ],
  },
  salary: {
    position: 4,
    label: 'Salary',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 50_000,
    value: {
      lowest: {
        paramKey: 'min_salary',
        value: 0,
      },
      highest: {
        paramKey: 'max_salary',
        value: 300_000,
      },
    },
  },
  seniority: {
    position: 2,
    label: 'Level',
    show: true,
    paramKey: 'level',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'Intern',
        value: '1',
      },
      {
        label: 'Junior',
        value: '2',
      },
      {
        label: 'Mid Level',
        value: '3',
      },
      {
        label: 'Senior',
        value: '4',
      },
      {
        label: 'Lead',
        value: '5',
      },
      {
        label: 'Staff',
        value: '6',
      },
    ],
  },
  locations: {
    position: 3,
    label: 'Location',
    show: true,
    paramKey: 'location',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'Remote',
        value: 'remote',
      },
      {
        label: 'Onsite',
        value: 'onsite',
      },
    ],
  },
  teamSize: {
    position: 5,
    label: 'Team Size',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 5,
    value: {
      lowest: {
        paramKey: 'min_team_size',
        value: 0,
      },
      highest: {
        paramKey: 'max_team_size',
        value: 50,
      },
    },
  },
  headCount: {
    position: 6,
    label: 'Employees',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 10,
    value: {
      lowest: {
        paramKey: 'min_employee_count',
        value: 0,
      },
      highest: {
        paramKey: 'max_employee_count',
        value: 100,
      },
    },
  },
  tech: {
    position: 13,
    label: 'Tech',
    show: true,
    paramKey: 'tech',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'REACT',
        value: 'react',
      },
      {
        label: 'JEST',
        value: 'jest',
      },
      {
        label: 'GoLang',
        value: 'golang',
      },
      {
        label: 'Solidity',
        value: 'solidity',
      },
      {
        label: 'Cypress',
        value: 'cypress',
      },
    ],
  },
  organizations: {
    position: 14,
    label: 'Organizations',
    show: true,
    paramKey: 'organiations',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'Uniswap Labs',
        value: 'uniswap-labs',
      },
      {
        label: 'Curve',
        value: 'curve',
      },
      {
        label: 'Pancake Swap',
        value: 'pancake-swap',
      },
      {
        label: 'Balancer',
        value: 'balancer',
      },
    ],
  },
  chains: {
    position: 15,
    label: 'Chains',
    show: true,
    paramKey: 'chains',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'Uniswap UNI',
        value: 'uniswap-uni',
      },
      {
        label: 'Pancake Swap',
        value: 'pancake-swap',
      },
      {
        label: 'Ethereum ETH',
        value: 'ethereum',
      },
    ],
  },
  projects: {
    position: 16,
    label: 'Projects',
    show: true,
    paramKey: 'projects',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'Uniswap V3 dApp',
        value: 'uniswap-v3-dapp',
      },
      {
        label: 'Pancake Swap',
        value: 'pancake-swap',
      },
      {
        label: 'Balancer V2 Protocol',
        value: 'balancer-v2-protocol',
      },
    ],
  },
  categories: {
    position: 17,
    label: 'Categories',
    show: true,
    paramKey: 'categories',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: [
      {
        label: 'Bridge',
        value: 'bridge',
      },
      {
        label: 'Indexes',
        value: 'Indexes',
      },
    ],
  },
  tvl: {
    position: 7,
    label: 'TVL',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 100_000,
    value: {
      lowest: {
        paramKey: 'min_tvl',
        value: 0,
      },
      highest: {
        paramKey: 'max_tvl',
        value: 5_000_000,
      },
    },
  },
  monthlyVolume: {
    position: 8,
    label: 'Monthly Volume',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 100_000,
    value: {
      lowest: {
        paramKey: 'min_monthly_volume',
        value: 0,
      },
      highest: {
        paramKey: 'max_monthly_volume',
        value: 5_000_000,
      },
    },
  },
  monthlyFees: {
    position: 9,
    label: 'Monthly Active Users',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 100_000,
    value: {
      lowest: {
        paramKey: 'min_monthly_active_users',
        value: 0,
      },
      highest: {
        paramKey: 'max_monthly_active_users',
        value: 5_000_000,
      },
    },
  },
  monthlyRevenue: {
    position: 10,
    label: 'Monthly Revenue',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 100_000,
    value: {
      lowest: {
        paramKey: 'min_monthly_revenue',
        value: 0,
      },
      highest: {
        paramKey: 'max_monthly_revenue',
        value: 5_000_000,
      },
    },
  },
  audits: {
    position: 11,
    label: 'Audits',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 5,
    value: {
      lowest: {
        paramKey: 'min_audits',
        value: 0,
      },
      highest: {
        paramKey: 'max_audits',
        value: 50,
      },
    },
  },
  hacks: {
    position: 12,
    label: 'Hacks',
    show: true,
    kind: FILTER_KIND_RANGE,
    stepSize: 5,
    value: {
      lowest: {
        paramKey: 'min_hacks',
        value: 0,
      },
      highest: {
        paramKey: 'max_hacks',
        value: 50,
      },
    },
  },
  mainNet: {
    position: 18,
    label: 'Live on Mainnet',
    show: true,
    paramKey: 'mainnet',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'Deployed to Mainnet',
        value: 'true',
      },
      {
        label: 'Deployed to Testnet',
        value: 'false',
      },
    ],
  },
  token: {
    position: 19,
    label: 'Token',
    show: true,
    paramKey: 'token',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'With Token',
        value: 'true',
      },
      {
        label: 'Without Token',
        value: 'false',
      },
    ],
  },
  order: {
    position: 20,
    label: 'Order',
    show: true,
    paramKey: 'order',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'Ascending',
        value: 'asc',
      },
      {
        label: 'Descending',
        value: 'desc',
      },
    ],
  },
  orderBy: {
    position: 21,
    label: 'Sort By',
    show: true,
    paramKey: 'order_by',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      {
        label: 'Publication Date',
        value: 'publication_date',
      },
      {
        label: 'TVL',
        value: 'tvl',
      },
      {
        label: 'Salary',
        value: 'salary',
      },
      {
        label: 'Funding Date',
        value: 'funding_date',
      },
      {
        label: 'Monthly Volume',
        value: 'monthly_volume',
      },
      {
        label: 'Monthly Active Users',
        value: 'monthly_active_users',
      },
      {
        label: 'Monthly Revenue',
        value: 'monthly_revenue',
      },
      {
        label: 'Audits',
        value: 'audits',
      },
      {
        label: 'Hacks',
        value: 'hacks',
      },
      {
        label: 'Chains',
        value: 'chains',
      },
      {
        label: 'Team Size',
        value: 'team_size',
      },
    ],
  },
});
