import { RefObject, useRef } from 'react';
import Frame from '../../../components/Frame';
import InputBorder from '../../../components/InputBorder';
import InputBorderSelect from '../../../components/InputBorderSelect';

const ManualWorkPlaceAddition = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2'>
          <InputBorder title='안녕' placeHolder='돌았네' ref={inputRef} />
          <InputBorderSelect ref={selectRef} />
        </div>
      </Frame>
    </>
  );
};

export default ManualWorkPlaceAddition;
