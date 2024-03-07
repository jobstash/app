import { ErrorAction } from '~/shared/components/error-action';
import { NotFoundButton } from '~/shared/components/not-found-button';

const NotFound = () => {
  const text = {
    heading: HEADING_TEXT,
    message: MESSAGE_TEXT,
  };

  const img = {
    src: IMG_SRC,
    width: 627,
    height: 445.5,
  };

  const classNames = {
    image: '-mb-8',
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center  md:pl-[212px]">
      <ErrorAction
        isTransparent
        textProps={text}
        imgProps={img}
        classNames={classNames}
        action={<NotFoundButton />}
      />
    </div>
  );
};
export default NotFound;

const IMG_SRC = '/not-found.png';
const HEADING_TEXT = 'Nothing Here';
const MESSAGE_TEXT = 'Content appears to be lost in the digital void';
