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
      'Current week',
      'Current month',
      'Last 3 months',
      'Last 6 months',
      'Last year',
      'Last 3 years',
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
    label: 'Seniority',
    show: true,
    paramKey: 'seniority',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Intern', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Staff'],
  },
  locations: {
    position: 3,
    label: 'Location',
    show: true,
    paramKey: 'location',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Remote', 'Onsite'],
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
    options: ['React', 'Jest', 'GoLang', 'Solidity', 'Cypress'],
  },
  organizations: {
    position: 14,
    label: 'Organizations',
    show: true,
    paramKey: 'organiations',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Uniswap Labs', 'Curve', 'Pancake Swap', 'Balancer'],
  },
  chains: {
    position: 15,
    label: 'Chains',
    show: true,
    paramKey: 'chains',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Uniswap UNI', 'Pancake Swap', 'Ethereum ETH'],
  },
  projects: {
    position: 16,
    label: 'Projects',
    show: true,
    paramKey: 'projects',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Uniswap V3 dApp', 'Pancake Swap', 'Balancer V2 Protocol'],
  },
  categories: {
    position: 17,
    label: 'Categories',
    show: true,
    paramKey: 'categories',
    kind: FILTER_KIND_MULTISELECT_WITH_SEARCH,
    options: ['Bridge', 'Indexes', 'Lending'],
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
    options: ['Deployed to Mainnet', 'Deployed to Testnet'],
  },
  token: {
    position: 19,
    label: 'Token',
    show: true,
    paramKey: 'token',
    kind: FILTER_KIND_SINGLESELECT,
    options: ['With Token', 'Without Token'],
  },
  order: {
    position: 20,
    label: 'Order',
    show: true,
    paramKey: 'order',
    kind: FILTER_KIND_SINGLESELECT,
    options: ['Ascending', 'Descending'],
  },
  orderBy: {
    position: 21,
    label: 'Sort By',
    show: true,
    paramKey: 'order_by',
    kind: FILTER_KIND_SINGLESELECT,
    options: [
      'Publication Date',
      'TVL',
      'Salary',
      'Funding Date',
      'Monthly Volume',
      'Monthly Active Users',
      'Monthly Revenue',
      'Audits',
      'Hacks',
      'Chains',
      'Team Size',
    ],
  },
});
