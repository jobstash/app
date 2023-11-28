import { useEffect, useState, useTransition } from 'react';

import { ActionIcon, List, Menu, Textarea } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Button, Text } from '@jobstash/shared/ui';

type Props = CellContext<JobsUpdateableFields, string[]>;

const ListCell = (props: Props) => {
  const { getValue, row, column, table } = props;

  const initialItems = getValue();
  const [items, setItems] = useState(initialItems);

  // Sync initial value
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const [isEditing, setIsEditing] = useState(false);
  const onClickEdit = () => {
    if (!isEditing) setIsEditing(true);
  };

  const isChanged = JSON.stringify(initialItems) !== JSON.stringify(items);

  const [isPending, startTransitionUpdate] = useTransition();

  const onClose = () => {
    if (isChanged) {
      startTransitionUpdate(() => {
        table.options.meta?.updateData(row.index, column.id, items);
      });
    }

    setIsEditing(false);
  };

  const onReset = () => setItems(initialItems);
  const onDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const swapItems = (index: number, up?: boolean) => {
    const newIndex = up ? index - 1 : index + 1;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [
      newItems[newIndex],
      newItems[index],
    ];

    setItems(newItems);
  };

  const [editIndex, setEditIndex] = useState(-1);
  const editItem = (index: number) => {
    setEditIndex(index);
  };

  const exitEditItem = () => setEditIndex(-1);

  const onChangeItem = (value: string, index: number) => {
    const newItems = items.map((item, i) => {
      const isCurrentItem = i === index;

      if (!isCurrentItem) {
        return item;
      }

      return value;
    });

    setItems(newItems);
  };

  return (
    <div
      className={cn(
        'relative',
        { 'cursor-pointer': !isEditing },
        { 'select-none opacity-50': isPending },
      )}
      onClick={onClickEdit}
    >
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <List
            size="sm"
            spacing="xs"
            classNames={{
              itemWrapper: 'w-full text-start',
            }}
          >
            {items.map((v, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <List.Item key={i}>
                <div className="flex items-center gap-1">
                  <Menu position="bottom-start">
                    <Menu.Target>
                      <ActionIcon>
                        <svg
                          viewBox="0 0 21 21"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <g
                            fill="none"
                            fillRule="evenodd"
                            transform="translate(2 2)"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 8.5 A8 8 0 0 1 8.5 16.5 A8 8 0 0 1 0.5 8.5 A8 8 0 0 1 16.5 8.5 z"
                            />
                            <path
                              fill="currentColor"
                              d="M8.5 9.5c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1zm-4 0c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1zm8 0c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1z"
                            />
                          </g>
                        </svg>
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M5 15h14l-7-8z" />
                          </svg>
                        }
                        disabled={i === 0}
                        onClick={() => swapItems(i, true)}
                      >
                        Move Up
                      </Menu.Item>
                      <Menu.Item
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M11.998 17l7-8h-14z" />
                          </svg>
                        }
                        disabled={i === items.length - 1}
                        onClick={() => swapItems(i)}
                      >
                        Move Down
                      </Menu.Item>
                      <Menu.Item
                        className="text-red-500"
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-red-500"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
                          </svg>
                        }
                        onClick={() => onDelete(i)}
                      >
                        Delete Item
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  {i === editIndex ? (
                    <div className="py-0.5 w-full">
                      <Textarea
                        autosize
                        autoFocus
                        classNames={{
                          input: cn(
                            `${roboto.variable} font-roboto antialiased rounded-lg bg-transparent focus:bg-dark text-white/80 border-0 focus:border-white/40 overflow-hidden focus:overflow-auto`,
                          ),
                          root: 'w-full',
                        }}
                        value={v}
                        rightSection={null}
                        onChange={(e) => onChangeItem(e.target.value, i)}
                        onBlur={exitEditItem}
                      />
                    </div>
                  ) : (
                    <div
                      className="p-3 cursor-pointer"
                      onClick={() => editItem(i)}
                    >
                      <Text>{v}</Text>
                    </div>
                  )}
                </div>
              </List.Item>
            ))}
          </List>

          <div className="flex justify-end w-full">
            <div className="flex items-center gap-2">
              <Button size="sm" isDisabled={!isChanged} onClick={onReset}>
                Reset
              </Button>
              <Button size="sm" onClick={onClose}>
                {isChanged ? 'Update' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <div className="pr-6">
            <List listStyleType="disc" size="sm" spacing="xs">
              {items.map((v) => (
                <List.Item key={v}>{v}</List.Item>
              ))}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCell;
