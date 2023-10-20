import { type ChangeEventHandler, useState } from 'react';

import { isValidUrl } from '@jobstash/shared/utils';

import { type ProfileShowcaseFormContextProps } from '../contexts/profile-showcase-form-context';

import { useProfileDevInfo } from './use-profile-dev-info';
const SHOWCASE_OPTIONS = ['CV', 'Portfolio', 'Website'];

export const useProfileShowcaseForm = (): ProfileShowcaseFormContextProps => {
  const { showcases, addShowcase } = useProfileDevInfo();

  const showcaseLabelSet = new Set(showcases.map((s) => s.label.toLowerCase()));

  const [createdOption, setCreatedOption] = useState('');

  const options = [
    ...SHOWCASE_OPTIONS.filter(
      (option) => !showcaseLabelSet.has(option.toLowerCase()),
    ),
    ...(createdOption ? [createdOption] : []),
  ];

  const [displayForm, setDisplayForm] = useState(false);

  const [currentShowcase, setCurrentShowcase] = useState({
    label: '',
    url: '',
  });

  const onChangeLabel = (v: string | null) => {
    setCurrentShowcase({ ...currentShowcase, label: v ?? '' });
  };

  const onCreateLabel = (v: string) => {
    setCreatedOption(v);
    setCurrentShowcase((prev) => ({ ...prev, label: v }));
    return v;
  };

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentShowcase({ ...currentShowcase, url: e.currentTarget.value });
  };

  const onClickAddItem = () => {
    if (currentShowcase.label) {
      addShowcase({ label: currentShowcase.label, url: currentShowcase.url });
      setCurrentShowcase({
        label: '',
        url: '',
      });
      setDisplayForm(false);
      setCreatedOption('');
    }
  };

  const onClickAddAnother = () => {
    setDisplayForm(true);
  };

  const hasErrorLabel = showcaseLabelSet.has(
    currentShowcase.label.toLowerCase(),
  );
  const hasErrorUrl =
    Boolean(currentShowcase.url) && !isValidUrl(currentShowcase.url);

  const errors = {
    label: hasErrorLabel ? 'Duplicate showcase' : null,
    url: hasErrorUrl ? 'Invalid URL' : null,
  };

  const disableUrlInput = !currentShowcase.label || Boolean(errors.label);
  const disableAddItem =
    !currentShowcase.url || disableUrlInput || Boolean(errors.url);

  const disabled = {
    urlInput: !currentShowcase.label || Boolean(errors.label),
    addItem: disableAddItem,
  };

  return {
    options,
    currentShowcase,
    showcaseLabelSet,
    displayForm,
    onChangeLabel,
    onCreateLabel,
    onChangeUrl,
    onClickAddItem,
    onClickAddAnother,
    errors,
    disabled,
  };
};
