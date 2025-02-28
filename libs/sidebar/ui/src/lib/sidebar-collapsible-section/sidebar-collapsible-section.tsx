import { useState } from 'react';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

interface Item {
  label: string;
  href: string;
}

interface AccordionSection {
  key: string;
  title: string;
  actions: string[];
}

const ACCORDION_SECTIONS: AccordionSection[] = [
  {
    key: 'jobstash',
    title: 'JobStash',
    actions: [
      'Edit Info',
      'Manage Jobs',
      'Applicants',
      'ATS Settings',
      'Candidate Report',
      'Talent Pool',
    ],
  },
  {
    key: 'ecosystem-vision',
    title: 'Ecosystem Vision',
    actions: ['Edit Info', 'Manage Jobs', 'Applicants'],
  },
];

interface Props {
  title: string;
  items: Item[];
}

export const SidebarCollapsibleSection = ({ title, items }: Props) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const onSelectionChange = (value: Set<React.Key> | 'all') => {
    setSelectedKeys(value as Set<string>);
  };

  return (
    <div className="flex flex-col gap-4 [&>*]:p-0">
      <span className="text-sm">{title}</span>
      <Accordion
        isCompact
        selectionMode="multiple"
        variant="splitted"
        itemClasses={{
          base: cn(
            'bg-transparent border-transparent p-0',
            'transition-all duration-200 ease-in-out',
            '[&>section]:bg-[#121216]',
          ),
          trigger:
            'bg-darker-gray hover:bg-dark-gray w-full rounded-lg p-3 h-10',
          title: cn(
            `${roboto.variable} font-roboto antialiased font-medium text-white`,
            'text-md align-center',
          ),
          content: cn(
            'bg-[#121216] flex flex-col gap-2 p-2 relative ml-3',
            'border-l border-white/10',
          ),
        }}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
      >
        {ACCORDION_SECTIONS.map((section) => (
          <AccordionItem
            key={section.key}
            title={section.title}
            indicator={({ isOpen }) =>
              isOpen ? (
                <ChevronLeftIcon size={16} />
              ) : (
                <ChevronRightIcon size={16} />
              )
            }
          >
            {section.actions.map((action) => (
              <Button
                key={action}
                radius="sm"
                variant="light"
                className="text-left w-full justify-start"
              >
                {action}
              </Button>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
