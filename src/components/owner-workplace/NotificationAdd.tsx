import BtnBottom from '../BtnBottom';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import { HStack, VStack } from '../ui/Stack';

type NotificationAddProps = {
  closeAddNotification: () => void;
};

const NotificationAdd = ({ closeAddNotification }: NotificationAddProps) => {
  return (
    <>
      <VStack className='border border-gray-300 p-4 rounded-lg'>
        <VStack>
          <label className='text-start text-lg font-bold' htmlFor='title'>
            제목
          </label>
          <input
            id='title'
            className='border border-gray-300 px-3 py-1 rounded-lg'
            placeholder='제목을 입력해주세요.'
          />
        </VStack>

        <VStack>
          <label className='text-start text-lg font-bold' htmlFor='content'>
            내용
          </label>
          <textarea
            id='content'
            className='border border-gray-300 px-3 py-1 h-72 rounded-lg'
            placeholder='내용을 입력해주세요.'
          />
        </VStack>
      </VStack>

      <BtnChoiceBox
        actionName={'등록'}
        closeName={'취소'}
        onAction={() => {}}
        onClose={closeAddNotification}
      />

      {/* <HStack className='gap-2 justify-between'>
        <button
          onClick={closeAddNotification}
          className='bg-gray-400 rounded-md w-1/4 text-white font-semibold h-[45px] text-center'
        >
          취소
        </button>
        <button
          onClick={closeAddNotification}
          className='bg-hanaLightGreen rounded-md w-3/4 text-white font-semibold h-[45px] text-center'
        >
          등록
        </button>
      </HStack> */}
    </>
  );
};
export default NotificationAdd;
