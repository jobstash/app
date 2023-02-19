import { FilterKind } from '../core/constants';
import { FilterConfig } from '../core/types';

export const sampleFilterConfig: FilterConfig = {
  publication_date: {
    position: 1,
    label: 'Publication Date',
    show: true,
    param_key: 'publication_date',
    kind: FilterKind.DATE,
    value: [
      {
        label: 'Today',
        value: 1_676_509_915,
      },
      {
        label: 'Last week',
        value: 1_675_991_515,
      },
      {
        label: 'Last month',
        value: 1_673_917_915,
      },
      {
        label: 'Last quarter',
        value: 1_668_647_515,
      },
      {
        label: 'Last year',
        value: 1_645_060_315,
      },
    ],
  },
  level: {
    position: 2,
    label: 'Level',
    show: true,
    param_key: 'level',
    kind: FilterKind.SINGLESELECT,
    value: [
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
  location: {
    position: 3,
    label: 'Location',
    show: true,
    param_key: 'location',
    kind: FilterKind.MULTISELECT,
    value: [
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
  salary: {
    position: 4,
    label: 'Salary',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 50_000,
    value: {
      lowest: {
        param_key: 'min_salary',
        value: 0,
      },
      highest: {
        param_key: 'max_salary',
        value: 300_000,
      },
    },
  },
  team_size: {
    position: 5,
    label: 'Team Size',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 5,
    value: {
      lowest: {
        param_key: 'min_team_size',
        value: 0,
      },
      highest: {
        param_key: 'max_team_size',
        value: 50,
      },
    },
  },
  employee_count: {
    position: 6,
    label: 'Employees',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 10,
    value: {
      lowest: {
        param_key: 'min_employee_count',
        value: 0,
      },
      highest: {
        param_key: 'max_employee_count',
        value: 100,
      },
    },
  },
  tvl: {
    position: 7,
    label: 'TVL',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 100_000,
    value: {
      lowest: {
        param_key: 'min_tvl',
        value: 0,
      },
      highest: {
        param_key: 'max_tvl',
        value: 5_000_000,
      },
    },
  },
  monthly_volume: {
    position: 8,
    label: 'Monthly Volume',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 100_000,
    value: {
      lowest: {
        param_key: 'min_monthly_volume',
        value: 0,
      },
      highest: {
        param_key: 'max_monthly_volume',
        value: 5_000_000,
      },
    },
  },
  monthly_active_users: {
    position: 9,
    label: 'Monthly Active Users',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 100_000,
    value: {
      lowest: {
        param_key: 'min_monthly_active_users',
        value: 0,
      },
      highest: {
        param_key: 'max_monthly_active_users',
        value: 5_000_000,
      },
    },
  },
  monthly_revenue: {
    position: 10,
    label: 'Monthly Revenue',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 100_000,
    value: {
      lowest: {
        param_key: 'min_monthly_revenue',
        value: 0,
      },
      highest: {
        param_key: 'max_monthly_revenue',
        value: 5_000_000,
      },
    },
  },
  audits: {
    position: 11,
    label: 'Audits',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 5,
    value: {
      lowest: {
        param_key: 'min_audits',
        value: 0,
      },
      highest: {
        param_key: 'max_audits',
        value: 50,
      },
    },
  },
  hacks: {
    position: 12,
    label: 'Hacks',
    show: true,
    kind: FilterKind.RANGE,
    step_size: 5,
    value: {
      lowest: {
        param_key: 'min_hacks',
        value: 0,
      },
      highest: {
        param_key: 'max_hacks',
        value: 50,
      },
    },
  },
  tech: {
    position: 13,
    label: 'Tech',
    show: true,
    param_key: 'tech',
    kind: FilterKind.MULTISELECT_SEARCH,
    value: [
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
    param_key: 'organiations',
    kind: FilterKind.MULTISELECT_SEARCH,
    value: [
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
    param_key: 'chains',
    kind: FilterKind.MULTISELECT_SEARCH,
    value: [
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
    param_key: 'projects',
    kind: FilterKind.MULTISELECT_SEARCH,
    value: [
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
    param_key: 'categories',
    kind: FilterKind.MULTISELECT_SEARCH,
    value: [
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
  mainnet: {
    position: 18,
    label: 'Live on Mainnet',
    show: true,
    param_key: 'mainnet',
    kind: FilterKind.BOOLEAN,
    value: [
      {
        label: 'Deployed to Mainnet',
        value: true,
      },
      {
        label: 'Deployed to Testnet',
        value: false,
      },
    ],
  },
  token: {
    position: 19,
    label: 'Token',
    show: true,
    param_key: 'token',
    kind: FilterKind.BOOLEAN,
    value: [
      {
        label: 'With Token',
        value: true,
      },
      {
        label: 'Without Token',
        value: false,
      },
    ],
  },
};
