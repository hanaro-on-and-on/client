import { ReactNode, useState } from 'react';
import BtnBottom from './BtnBottom';
import BtnGray from './BtnGray';
import BtnPrimary from './BtnPrimary';

type Prop = {
  title?: string;
  hasDecline?: boolean;
  declineText?: string;
  confirmText?: string;
  declineAction?: { (): void }[];
  confirmAction: { (): void }[];
  children: ReactNode;
};

const ModalCenter = ({
  title = 'error',
  hasDecline = false,
  declineText = '취소',
  confirmText = '확인',
  declineAction,
  confirmAction,
  children,
}: Prop) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      {isOpen && (
        <div className='fixed w-[390px] h-screen bg-black bg-opacity-50 z-40 flex justify-center items-center'>
          <div className='flex flex-col items-center justify-between py-7 bg-white w-[60%] min-h-[200px] rounded-3xl'>
            <div className='font-bold'>{title}</div>
            <div>{children}</div>
            <div className='flex gap-5'>
              {hasDecline && (
                <BtnGray
                  text={declineText}
                  action={[...(declineAction || []), () => setIsOpen(false)]}
                />
              )}
              <BtnPrimary
                text={confirmText}
                action={[...confirmAction, () => setIsOpen(false)]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCenter;
