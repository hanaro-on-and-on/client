import { ReactNode } from 'react';
import BtnBottom from './BtnBottom';

type Prop = {
  title?: string;
  btnBottom?: boolean;
  action?: { (): void }[];
  btnText?: string;
  children: ReactNode;
  closeModal: () => void;
};

const ModalBottom = ({
  title,
  btnBottom,
  action,
  btnText,
  closeModal,
  children,
}: Prop) => {
  return (
    <>
      <div className='fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center'>
        <div className='fixed bottom-0 w-[390px]  bg-white rounded-t-3xl drop-shadow-sm min-h-[200px] flex flex-col justify-between px-5 pt-10 pb-5 '>
          {title && <div className='font-black mb-2'>{title}</div>}
          <div>{children}</div>
          {btnBottom && (
            <div>
              <BtnBottom
                text={btnText || ''}
                action={[...(action ?? []), closeModal]}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalBottom;
