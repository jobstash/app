import { Modal } from '@mantine/core';

import { getToggleFilterText } from '@jobstash/filters/utils';

import { useFiltersContext } from '@jobstash/filters/state';
import { useIsMobile } from '@jobstash/shared/state';

import { FilterIcon, Text } from '@jobstash/shared/ui';

import FilterActions from './filter-actions';
import FilterInputs from './filter-inputs';

const FullscreenFilterModal = () => {
  const isMobile = useIsMobile();
  const { showFullscreenModal, toggleFilters, filterCount } =
    useFiltersContext();

  const opened = showFullscreenModal && isMobile;

  return (
    <Modal
      fullScreen
      opened={opened}
      title={
        <div className="flex items-center gap-4 pt-2">
          <FilterIcon />
          <Text size="lg" fw="bold">
            {getToggleFilterText(filterCount)}
          </Text>
        </div>
      }
      onClose={toggleFilters}
    >
      <div className="pt-4">
        <FilterInputs isMobile />
        <FilterActions isMobile />
      </div>
    </Modal>
  );
};

export default FullscreenFilterModal;
