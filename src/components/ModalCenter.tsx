import { ReactNode } from 'react';
import BtnGray from './BtnGray';
import BtnPrimary from './BtnPrimary';

type Prop = {
  title?: string;
  hasDecline?: boolean;
  declineText?: string;
  confirmText?: string;
  declineAction?: () => void;
  confirmAction: () => void;
  closeModal: () => void;
  children: ReactNode;
};

const ModalCenter = ({
  title = 'error',
  hasDecline = false,
  declineText = '취소',
  confirmText = '확인',
  declineAction = () => {},
  confirmAction = () => {},
  closeModal,
  children,
}: Prop) => {
  return (
    <>
      <div className='fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center'>
        <div className='flex flex-col gap-3 items-center justify-between py-7 px-5 bg-white w-[70%] min-h-[230px] rounded-3xl text-clip'>
          <div className='font-bold'>{title}</div>
          <div>{children}</div>
          <div className='flex gap-5 w-full'>
            {hasDecline && (
              <BtnGray
                text={declineText}
                action={() => {
                  declineAction();
                  closeModal();
                }}
              />
            )}
            <BtnPrimary
              className='w-full'
              text={confirmText}
              action={() => {
                confirmAction();
                closeModal();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCenter;
