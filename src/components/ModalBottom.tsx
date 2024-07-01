/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react';
import BtnBottom from './BtnBottom';

type Prop = {
  title?: string;
  btnBottom?: boolean;
  action?: () => void;
  btnText?: string;
  children: ReactNode;
  closeModal: () => void;
};

const ModalBottom = ({
  title,
  btnBottom,
  action = () => {},
  btnText,
  closeModal,
  children,
}: Prop) => {
  return (
    <>
      <div
        className='fixed bottom-0 self-center w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center'
        onClick={closeModal}
      >
        <div
          className='fixed bottom-0 w-[390px]  bg-white rounded-t-3xl drop-shadow-sm min-h-[200px] flex flex-col justify-between px-5 pt-0 pb-5 '
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className='w-full py-3 flex justify-center bg-transparent'
            onClick={closeModal}
          >
            <div className='rounded-xl w-[90px] bg-slate-500 h-1 '></div>
          </button>

          {title && <div className='font-black mb-2'>{title}</div>}
          <div>{children}</div>
          {btnBottom && (
            <div>
              <BtnBottom text={btnText || ''} action={action} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalBottom;
