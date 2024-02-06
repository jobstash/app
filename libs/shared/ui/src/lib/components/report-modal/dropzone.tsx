/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction } from 'react';

import {
  DocumentCheckIcon,
  DocumentMinusIcon,
  PhotoIcon,
} from '@heroicons/react/16/solid';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import Heading from '../../base/heading';
import Text from '../../base/text';

interface Props extends Partial<DropzoneProps> {
  attachments: { path: string }[];
  setAttachments: Dispatch<SetStateAction<{ path: string }[]>>;
  isDisabled: boolean;
}

const ReportModalDropzone = (props: Props) => {
  const onDrop = async (files: any) => {
    if (Array.isArray(files)) {
      const results: { path: string }[] = [];

      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        const path = await getBase64StringFromFile(file);
        if (path && typeof path === 'string') {
          results.push({ path });
        }
      }

      props.setAttachments((prev) => [...prev, ...results]);
    }
  };

  // Forward dropzone props
  const dropzoneProps = (({ setAttachments, isDisabled, ...o }) => o)(props);

  const imageCount = props.attachments.length;
  const dropzoneTitle = `Upload screenshots${
    imageCount > 0 ? ` (${imageCount})` : ''
  }`;

  return (
    <Dropzone
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      disabled={props.isDisabled}
      onDrop={onDrop}
      {...dropzoneProps}
    >
      <div className="pointer-events-none flex items-center justify-center gap-2">
        <div className="flex items-center justify-center w-16 h-16">
          <Dropzone.Accept>
            <DocumentCheckIcon className="h-12 w-12" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <DocumentMinusIcon className="h-12 w-12" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <PhotoIcon className="h-12 w-12" />
          </Dropzone.Idle>
        </div>

        <div className="flex flex-col">
          <Heading size="md">{dropzoneTitle}</Heading>
          <Text color="dimmed">Attach attachments not exceeding 5mb total</Text>
        </div>
      </div>
    </Dropzone>
  );
};

export default ReportModalDropzone;

const getBase64StringFromFile = async (file: Blob) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Problem parsing input file'));
    };

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onload = () => {
      resolve(reader.result?.toString());
    };

    reader.readAsDataURL(file);
  });
};
