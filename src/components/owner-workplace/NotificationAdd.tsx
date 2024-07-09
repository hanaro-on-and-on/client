import { useNavigate, useParams } from 'react-router-dom';
import BtnBottom from '../BtnBottom';
import BtnChoiceBox from '../ui/BtnChoiceBox';
import { HStack, VStack } from '../ui/Stack';
import { ChangeEvent, useState } from 'react';
import ApiClient from '../../api/apiClient';

type NotificationAddProps = {
  closeAddNotification: () => void;
};

const NotificationAdd = ({ closeAddNotification }: NotificationAddProps) => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  // console.log(id);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const fetchNotice = async (id: number, title: string, content: string) => {
    try {
      const response = await ApiClient.getInstance().registerNotice(id, {
        title,
        content,
      });
      console.log('API 호출 결과:', response);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onClickConfirm = async () => {
    if (id && title && content) {
      await fetchNotice(Number(id), title, content);
      closeAddNotification();
    } else {
      setError('제목과 내용을 입력해주세요.');
    }
  };

  return (
    <>
      <VStack className='border border-gray-300 p-4 rounded-lg'>
        <VStack>
          <label className='text-start text-lg font-bold' htmlFor='title'>
            제목
          </label>
          <input
            id='title'
            value={title}
            onChange={onChangeTitle}
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
            value={content}
            onChange={onChangeContent}
            className='border border-gray-300 px-3 py-1 h-72 rounded-lg'
            placeholder='내용을 입력해주세요.'
          />
        </VStack>

        {error && <div>{error}</div>}
      </VStack>

      <BtnChoiceBox
        actionName={'등록'}
        closeName={'취소'}
        onAction={onClickConfirm}
        onClose={closeAddNotification}
      />
    </>
  );
};
export default NotificationAdd;
