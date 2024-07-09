// src/components/KakaoPostcode.tsx
import React, { useEffect, useState } from 'react';
import { HStack, VStack } from './Stack';

declare global {
  interface Window {
    daum: any;
  }
}

type KakaoPostcodeProps = {
  postcode: string;
  setPostcode: (postCode: string) => void;
  roadAddress: string;
  setRoadAddress: (roadAddress: string) => void;
  detailAddress: string;
  setDetailAddress: (detailAddress: string) => void;
  extraAddress: string;
  setExtraAddress: (extraAddress: string) => void;
};

const KakaoPostcode = ({
  postcode,
  setPostcode,
  roadAddress,
  setRoadAddress,
  detailAddress,
  setDetailAddress,
  extraAddress,
  setExtraAddress,
}: KakaoPostcodeProps) => {
  // const [postcode, setPostcode] = useState('');
  // const [roadAddress, setRoadAddress] = useState('');
  // const [detailAddress, setDetailAddress] = useState('');
  // const [extraAddress, setExtraAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => {
      console.log('Kakao Postcode script loaded.');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleComplete = (data: any) => {
    const roadAddr = data.roadAddress;
    let extraRoadAddr = '';

    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    if (data.buildingName !== '' && data.apartment === 'Y') {
      extraRoadAddr +=
        extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
    }
    if (extraRoadAddr !== '') {
      extraRoadAddr = ' (' + extraRoadAddr + ')';
    }

    setPostcode(data.zonecode);
    setRoadAddress(roadAddr);
    setExtraAddress(roadAddr !== '' ? extraRoadAddr : '');
  };

  const handleSearch = () => {
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  return (
    <div>
      <VStack className='border-2 border-gray-300  focus-within:border-hanaLightGreen rounded-xl p-5 shadow-lg gap-4 transition-all duration-300'>
        <div className='text-left font-bold'>주소</div>
        <HStack className='justify-between'>
          <input
            type='text'
            id='sample4_postcode'
            className='border-b border-b-gray-400 w-16'
            placeholder='우편번호'
            value={postcode}
            readOnly
          />
          <input
            type='button'
            onClick={handleSearch}
            className='border px-2 bg-hanaLightGreen rounded-md text-white'
            value='우편번호 찾기'
          />
        </HStack>
        <input
          type='text'
          id='sample4_roadAddress'
          className='border-b border-b-gray-400'
          placeholder='도로명주소'
          value={roadAddress}
          readOnly
        />
        <input
          type='text'
          id='sample4_detailAddress'
          placeholder='상세주소'
          className='border-b border-b-gray-400'
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <input
          type='text'
          id='sample4_extraAddress'
          placeholder='참고항목'
          className='border-b border-b-gray-400 mb-5'
          value={extraAddress}
          readOnly
        />
      </VStack>
    </div>
  );
};

export default KakaoPostcode;
