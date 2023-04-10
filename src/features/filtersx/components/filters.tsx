import {
  Collapse,
  MultiSelect,
  Popover,
  RangeSlider,
  Select,
  TextInput,
} from '@mantine/core';

import {
  Button,
  CaretDownIcon,
  FilterIcon,
  Heading,
  SearchInputIcon,
  Text,
} from '~/shared/components';
import { roboto } from '~/shared/core/constants';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export const Filters = ({ isOpen, toggle }: Props) => (
  <div className="flex flex-col gap-y-2 py-8 pb-4">
    <div>
      <TextInput
        icon={<SearchInputIcon />}
        placeholder="Search Jobs"
        size="lg"
        radius="md"
        //
        styles={{
          input: {
            background: 'rgba(255, 255, 255, 0.1)',
            fontSize: 16,
            border: 'transparent',
          },
        }}
      />
    </div>

    <div className="relative min-h-[70px]">
      <div className="absolute flex items-center pt-4">
        <Button
          variant="outline"
          isActive={isOpen}
          left={<FilterIcon />}
          onClick={toggle}
        >
          Filters & Sorting
        </Button>
      </div>

      <Collapse
        in={isOpen}
        transitionDuration={350}
        transitionTimingFunction="linear"
      >
        <div className="grid grid-cols-5 gap-10 py-4">
          <div />
          <div />
          <div />
          <div className="[&>*]:w-full">
            <Select
              clearable
              placeholder="Sort By"
              data={[
                'Publication Date',
                'TVL',
                'Salary',
                'Funding Date',
                'Monthly Volume',
                'Monthly Fees',
                'Monthly Revenue',
                'Number of Audits',
                'Number of Hacks',
                'Number of Chains',
                'Head Count',
                'Team Size',
              ]}
              classNames={{
                input:
                  'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white',
                itemsWrapper: 'bg-dark',
                item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
              }}
            />
          </div>

          <div className="[&>*]:w-full">
            <Select
              clearable
              placeholder="Sort Order"
              data={['Ascending', 'Descending']}
              classNames={{
                input:
                  'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white placeholder-white',
                itemsWrapper: 'bg-dark',
                item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
              }}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Date
            </Heading>
            <div className="[&>*]:w-full">
              <Select
                clearable
                placeholder="Select"
                data={[
                  'This week',
                  'This Month',
                  'Past 2 Weeks',
                  'Past 3 Months',
                  'Past 6 Months',
                ]}
                classNames={{
                  input:
                    'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Salary
            </Heading>
            <Popover
              withinPortal
              position="bottom-start"
              width={320}
              classNames={{
                dropdown: 'bg-dark',
              }}
            >
              <Popover.Target>
                <div className="[&>*]:w-full">
                  <Button
                    isFullWidth
                    variant="outline"
                    right={<CaretDownIcon />}
                  >
                    Select
                  </Button>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <RangeSlider
                  labelAlwaysOn
                  step={20}
                  label={(v) => `$${v === 0 ? '0' : v * (75 / 20) + 'K'}`}
                  marks={[
                    { value: 0, label: '$0' },
                    { value: 20, label: '$75K' },
                    { value: 40, label: '$150K' },
                    { value: 60, label: '$225K' },
                    { value: 80, label: '$300K' },
                    { value: 100, label: '$375K' },
                  ]}
                  classNames={{
                    root: 'my-10 mx-2',
                    bar: 'bg-gradient-to-l from-primary to-tertiary',
                    thumb: 'bg-white/60 border-primary',
                    mark: 'bg-white/90 border',
                    markFilled: 'border border-primary',
                    label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
                    markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
                  }}
                />
              </Popover.Dropdown>
            </Popover>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Level
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={['Staff', 'Lead', 'Senior', 'Medior', 'Junior', 'Intern']}
                placeholder="Select"
                classNames={{
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Location
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'Remote',
                  'United States',
                  'China',
                  'Singapore',
                  'Germany',
                  'Europe',
                  'Russia',
                  'India',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Technologies
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'React',
                  'Solidity',
                  'Rust',
                  'Typescript',
                  'Docker',
                  'GCP',
                  'Terraform',
                  'Helm',
                  'Go',
                  'Kubernetes',
                  'AWS',
                  'Elasticsearch',
                  'Postgresql',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Funding
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'Private',
                  'Pre-Seed',
                  'Angel Round',
                  'Public Token Sale',
                  'Corporate Bound',
                  'Seed',
                  'Series A',
                  'Series B',
                  'Series C',
                  'Series D',
                  'Series E',
                  'Series F',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Organizations
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'Uniswap Labs',
                  'Curve',
                  'Coinbase',
                  'Tessera',
                  'Harmony',
                  'Bitget',
                  'Immutable',
                  'Fuel Labs',
                  'Pancake Swap',
                  'Gala Games',
                  'Biconomy',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Projects
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'Hyphen',
                  'Uniswap V3',
                  'Ondo Finance',
                  'ZK Money',
                  'Opensea',
                  'Fractional Art',
                  'Kava Earn',
                  'Across',
                  'dYdX',
                  'WooFi Dex',
                  'Goldfinch',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Category
            </Heading>
            <div className="[&>*]:w-full">
              <MultiSelect
                data={[
                  'Bridge',
                  'Dexes',
                  'Yield',
                  'Privacy',
                  'NFT Marketplace',
                  'Indexes',
                  'Yield Aggregator',
                  'Cross Chain',
                  'Lending',
                  'Options',
                  'Derivatives',
                ]}
                placeholder="Select"
                classNames={{
                  wrapper: 'ring-0',
                  input:
                    'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
                  searchInput: 'placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                  values: 'overflow-hidden flex-nowrap',
                }}
              />
            </div>
          </div>

          <div className="z-50 flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              TVL
            </Heading>
            <div className="[&>*]:w-full">
              <Popover
                withinPortal
                position="bottom-end"
                width={320}
                classNames={{
                  dropdown: 'bg-dark',
                }}
              >
                <Popover.Target>
                  <div className="[&>*]:w-full">
                    <Button
                      isFullWidth
                      variant="outline"
                      right={<CaretDownIcon />}
                    >
                      Select
                    </Button>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <RangeSlider
                    labelAlwaysOn
                    step={20}
                    label={(v) => `$${v === 0 ? '0' : v * (50 / 20) + 'M'}`}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 20, label: '$50M' },
                      { value: 40, label: '$150M' },
                      { value: 60, label: '$200M' },
                      { value: 80, label: '$250M' },
                      { value: 100, label: '$300M' },
                    ]}
                    classNames={{
                      root: 'my-10 mx-2',
                      bar: 'bg-gradient-to-l from-primary to-tertiary',
                      thumb: 'bg-white/60 border-primary',
                      mark: 'bg-white/90 border',
                      markFilled: 'border border-primary',
                      label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
                      markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
                    }}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Token
            </Heading>
            <div className="[&>*]:w-full">
              <Select
                clearable
                placeholder="Select"
                data={['Yes', 'No']}
                classNames={{
                  input:
                    'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Monthly Volume
            </Heading>
            <div className="[&>*]:w-full">
              <Popover
                withinPortal
                position="bottom-start"
                width={320}
                classNames={{
                  dropdown: 'bg-dark',
                }}
              >
                <Popover.Target>
                  <div className="[&>*]:w-full">
                    <Button
                      isFullWidth
                      variant="outline"
                      right={<CaretDownIcon />}
                    >
                      Select
                    </Button>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <RangeSlider
                    labelAlwaysOn
                    step={20}
                    label={(v) => `$${v === 0 ? '0' : v * (50 / 20) + 'M'}`}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 20, label: '$50M' },
                      { value: 40, label: '$150M' },
                      { value: 60, label: '$200M' },
                      { value: 80, label: '$250M' },
                      { value: 100, label: '$300M' },
                    ]}
                    classNames={{
                      root: 'my-10 mx-2',
                      bar: 'bg-gradient-to-l from-primary to-tertiary',
                      thumb: 'bg-white/60 border-primary',
                      mark: 'bg-white/90 border',
                      markFilled: 'border border-primary',
                      label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
                      markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
                    }}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Monthly Fees
            </Heading>
            <div className="[&>*]:w-full">
              <Popover
                withinPortal
                position="bottom-start"
                width={320}
                classNames={{
                  dropdown: 'bg-dark',
                }}
              >
                <Popover.Target>
                  <div className="[&>*]:w-full">
                    <Button
                      isFullWidth
                      variant="outline"
                      right={<CaretDownIcon />}
                    >
                      Select
                    </Button>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <RangeSlider
                    labelAlwaysOn
                    step={20}
                    label={(v) => `$${v === 0 ? '0' : v * (50 / 20) + 'M'}`}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 20, label: '$50M' },
                      { value: 40, label: '$150M' },
                      { value: 60, label: '$200M' },
                      { value: 80, label: '$250M' },
                      { value: 100, label: '$300M' },
                    ]}
                    classNames={{
                      root: 'my-10 mx-2',
                      bar: 'bg-gradient-to-l from-primary to-tertiary',
                      thumb: 'bg-white/60 border-primary',
                      mark: 'bg-white/90 border',
                      markFilled: 'border border-primary',
                      label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
                      markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
                    }}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Monthly Revenue
            </Heading>
            <div className="[&>*]:w-full">
              <Popover
                withinPortal
                position="bottom-start"
                width={320}
                classNames={{
                  dropdown: 'bg-dark',
                }}
              >
                <Popover.Target>
                  <div className="[&>*]:w-full">
                    <Button
                      isFullWidth
                      variant="outline"
                      right={<CaretDownIcon />}
                    >
                      Select
                    </Button>
                  </div>
                </Popover.Target>
                <Popover.Dropdown>
                  <RangeSlider
                    labelAlwaysOn
                    step={20}
                    label={(v) => `$${v === 0 ? '0' : v * (50 / 20) + 'M'}`}
                    marks={[
                      { value: 0, label: '$0' },
                      { value: 20, label: '$50M' },
                      { value: 40, label: '$150M' },
                      { value: 60, label: '$200M' },
                      { value: 80, label: '$250M' },
                      { value: 100, label: '$300M' },
                    ]}
                    classNames={{
                      root: 'my-10 mx-2',
                      bar: 'bg-gradient-to-l from-primary to-tertiary',
                      thumb: 'bg-white/60 border-primary',
                      mark: 'bg-white/90 border',
                      markFilled: 'border border-primary',
                      label: `-mt-1 ${roboto.variable} font-roboto bg-dark-gray px-2`,
                      markLabel: `text-sm pt-2 ${roboto.variable} font-roboto`,
                    }}
                  />
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Hacks
            </Heading>
            <div className="[&>*]:w-full">
              <Select
                clearable
                placeholder="Select"
                data={['Yes', 'No']}
                classNames={{
                  input:
                    'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Heading size="sm" fw="semibold">
              Mainnet
            </Heading>
            <div className="[&>*]:w-full">
              <Select
                clearable
                placeholder="Select"
                data={['Yes', 'No']}
                classNames={{
                  input:
                    'bg-dark rounded-lg border-gray focus:border-white/30 text-white placeholder-white',
                  itemsWrapper: 'bg-dark',
                  item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 py-5">
          <Button variant="primary">Apply Filters</Button>
          <Button variant="outline">Clear Filters</Button>
        </div>
      </Collapse>
    </div>

    <div>
      <Text color="dimmed">Jobs Listed: TBD</Text>
    </div>
  </div>
);
