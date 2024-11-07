import { useRef, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  ScrollShadow,
  Textarea,
} from '@nextui-org/react';
import { Check, PencilOff, Plus } from 'lucide-react';

import { UpdateOrgJobPayload } from '@jobstash/organizations/core';
import { cn } from '@jobstash/shared/utils';

import { HandleFieldChange } from './types';

type FormListKey = 'requirements' | 'responsibilities' | 'benefits';

interface Props {
  formState: UpdateOrgJobPayload;
  handleFieldChange: HandleFieldChange;
}

const sectionConfig = [
  {
    formKey: 'requirements' as FormListKey,
    title: 'Requirements',
    subtitle:
      'List the essential skills, qualifications, and experience needed for the role.',
    itemLabel: 'Requirement',
  },
  {
    formKey: 'responsibilities' as FormListKey,
    title: 'Responsibilities',
    subtitle:
      'Outline the primary duties and tasks expected of the candidate in this role.',
    itemLabel: 'Responsibility',
  },
  {
    formKey: 'benefits' as FormListKey,
    title: 'Benefits',
    subtitle: 'Highlight the perks and benefits offered by the company.',
    itemLabel: 'Benefit',
  },
];

export const EditModalSpecifications = ({
  formState,
  handleFieldChange,
}: Props) => {
  const [activeItem, setActiveItem] = useState<{
    formKey: FormListKey;
    value: string;
  } | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');

  const clear = () => {
    setEditingValue('');
    setActiveItem(null);
  };

  const commitChange = () => {
    if (activeItem) {
      const { formKey, value } = activeItem;
      const items = formState[formKey] || [];
      const index = items.indexOf(value);

      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = editingValue;
        handleFieldChange(formKey, updatedItems);
      }

      clear();
    }
  };

  const removeItem = () => {
    if (activeItem) {
      const { formKey, value } = activeItem;
      const items = formState[formKey] || [];
      const updatedItems = items.filter((item) => item !== value);
      handleFieldChange(formKey, updatedItems);

      clear();
    }
  };

  const startEditing = (formKey: FormListKey, item: string) => {
    if (
      activeItem &&
      (activeItem.formKey !== formKey || activeItem.value !== item)
    ) {
      commitChange();
    }

    setActiveItem({ formKey, value: item });
    setEditingValue(item);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollItemsToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const clearNewItem = () => {
    setNewItemValue('');
    setIsOpenAdd(false);
  };

  const addItem = (formKey: FormListKey) => {
    if (newItemValue.trim()) {
      const updatedItems = [...(formState[formKey] || []), newItemValue];
      handleFieldChange(formKey, updatedItems);
      clearNewItem();
    }
  };

  const openNewItem = () => {
    scrollItemsToBottom();
    setIsOpenAdd(true);
  };

  return (
    <Accordion
      variant="splitted"
      selectionMode="single"
      itemClasses={{
        base: 'bg-white/5',
        title: 'text-md',
        subtitle: 'text-tiny',
      }}
      onSelectionChange={clearNewItem}
    >
      {sectionConfig.map(({ formKey, title, subtitle, itemLabel }) => (
        <AccordionItem key={formKey} title={title} subtitle={subtitle}>
          <ScrollShadow
            ref={scrollRef}
            size={20}
            className={cn('w-full flex flex-col pl-2', {
              'h-[300px]': formState[formKey]?.length > 4,
            })}
          >
            {(formState[formKey] || []).map((item) => (
              <div
                key={item}
                className="hover:cursor-pointer hover:bg-white/5 py-2 px-4 rounded-xl max-w-2xl"
                onClick={() => startEditing(formKey, item)}
              >
                {activeItem?.formKey === formKey &&
                activeItem.value === item ? (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      label="Edit Item"
                      value={editingValue}
                      classNames={{
                        inputWrapper: 'bg-white/5 rounded-md',
                      }}
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <div className="w-full flex justify-between">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          startContent={
                            <Check className="w-4 h-4 text-green-500" />
                          }
                          isDisabled={item === editingValue}
                          onClick={commitChange}
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          startContent={<PencilOff className="w-3 h-3" />}
                          onClick={clear}
                        >
                          Cancel
                        </Button>
                      </div>
                      <Button
                        startContent={<DeleteIcon />}
                        size="sm"
                        onClick={removeItem}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span className="text-md">{item}</span>
                )}
              </div>
            ))}
          </ScrollShadow>

          <div
            className={cn('flex flex-col gap-2 max-w-2xl', {
              'mt-4 pl-4': formState[formKey]?.length > 0,
            })}
          >
            {isOpenAdd ? (
              <>
                <Textarea
                  label={`New ${itemLabel}`}
                  value={newItemValue}
                  classNames={{
                    inputWrapper: 'bg-white/5 rounded-md',
                  }}
                  onChange={(e) => setNewItemValue(e.target.value)}
                />
                <div className="w-full flex gap-3 pt-2">
                  <Button
                    size="sm"
                    startContent={<Plus className="w-4 h-4 text-green-500" />}
                    onClick={() => addItem(formKey)}
                  >
                    Add {`${itemLabel}`}
                  </Button>
                  <Button
                    size="sm"
                    startContent={<PencilOff className="w-3 h-3" />}
                    onClick={clearNewItem}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="pb-4">
                <Button
                  size="sm"
                  startContent={<Plus className="w-4 h-4 text-green-500" />}
                  onClick={openNewItem}
                >
                  {`Add ${itemLabel}`}
                </Button>
              </div>
            )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-red-500">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm3-3V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z" />
  </svg>
);
