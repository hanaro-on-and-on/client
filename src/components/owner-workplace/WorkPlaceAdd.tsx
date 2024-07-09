/* eslint-disable jsx-a11y/label-has-associated-control */
import DatePicker from 'react-datepicker';
import Nav from '../Nav';
import InputBox from '../ui/InputBox';
import { HStack, Spacer, VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';
import { ChangeEvent, useState } from 'react';
import '../../styles/custom.css';
import KakaoPostcode from '../ui/KakaoPostcode';
import BtnBottom from '../BtnBottom';
import ApiClient from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import { usePlace } from '../../contexts/Place-Context';
import { getRandomNumber } from '../../utils/random';

enum BusinessStatus {
  ACTIVE = '계속사업자',
  CLOSED = '폐업자',
  SUSPENDED = '휴업자',
}

const convertToYYYYMMDD = (date: Date) => {
  const fullYear = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${fullYear}${month}${day}`;
};
const concatAddress = (roadAddress: string, detailAddress: string) => {
  return `${roadAddress} ${detailAddress}`;
};

const WorkPlaceAdd = () => {
  const navigate = useNavigate();
  const { setFirstInfo } = usePlace();

  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState<string>('');
  const [openDate, setOpenDate] = useState<Date | null>(null);
  const [businessName, setBusinessName] = useState('');

  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeRegistrationNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, '');
    setBusinessRegistrationNumber(numbersOnly);
  };
  const onChangeBusinessName = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  };

  const fetchCheck = async (
    businessRegistrationNumber: string,
    openDate: string,
    businessName: string,
    businessAddress: string
  ) => {
    try {
      const response = await ApiClient.getInstance().validBusinessNumber({
        businessRegistrationNumber,
        openDate,
        businessName,
        businessAddress,
      });
      console.log('API 호출 결과:', response);
      return response;
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  const onClickCheck = async () => {
    if (
      businessRegistrationNumber &&
      openDate &&
      businessName &&
      roadAddress &&
      detailAddress
    ) {
      console.log(businessRegistrationNumber);
      console.log(convertToYYYYMMDD(openDate));
      console.log(businessName);
      console.log(concatAddress(roadAddress, detailAddress));

      const response = await fetchCheck(
        businessRegistrationNumber,
        convertToYYYYMMDD(openDate),
        businessName,
        concatAddress(roadAddress, detailAddress)
      );
      // console.log(response);

      if (response) {
        console.log('🚀  onClickCheck  response:', response);
        if (!response.valid) {
          setErrorMessage('입력정보를 확인해주세요');
          return;
        }
        if (response.b_stt === BusinessStatus.CLOSED) {
          setErrorMessage('현재 폐업상태에요.');
          return;
        }
        if (response.b_stt === BusinessStatus.SUSPENDED) {
          setErrorMessage('현재 휴업상태에요.');
          return;
        }
        setFirstInfo({
          workPlaceNm: businessName,
          address: roadAddress,
          businessRegistrationNumber,
          openingDate: convertToYYYYMMDD(openDate),
          workPlaceType: 'SMALL_BUSINESS',
          colorTypeCode: getRandomNumber(1, 10),
        });
        navigate('/owner/addPlaceSecond');
      }
    }
  };

  return (
    <div style={{ height: '90vh' }}>
      <Nav title='사장님 ON'></Nav>

      <VStack className='p-6 gap-5'>
        <VStack>
          <h2 className='text-2xl text-left font-bold'>사업자이신가요?</h2>
          <h3 className='text-left font-semibold text-gray-400'>
            사업자등록번호로 사업장을 등록할 수 있어요.
          </h3>
        </VStack>

        <VStack className='gap-5'>
          <InputBox
            label='사업자등록번호'
            value={businessRegistrationNumber}
            onChange={onChangeRegistrationNumber}
            placeholder='- 없이 입력해주세요.'
          />
          <InputBox
            label='상호명'
            value={businessName}
            onChange={onChangeBusinessName}
            placeholder='정확한 상호명을 입력해주세요.'
          />
          <VStack
            className={`border-2 border-gray-300  focus-within:border-hanaLightGreen rounded-xl p-5 shadow-lg gap-2 transition-all duration-300`}
          >
            <label htmlFor='startDate' className='font-semibold text-left'>
              개업일
            </label>
            <HStack className='w-full border-b border-gray-300 items-baseline justify-between'>
              <DatePicker
                id='startDate'
                className='w-72 cursor-pointer focus:outline-none'
                // customInput={<CustomInput />}
                dateFormat='yyyy.MM.dd'
                selected={openDate}
                onChange={(date) => setOpenDate(date)}
                placeholderText='개업일 입력'
              />
              <label htmlFor='startDate'>
                <FaAngleDown className='text-end' />
              </label>
            </HStack>
          </VStack>
          <KakaoPostcode
            postcode={postcode}
            setPostcode={setPostcode}
            roadAddress={roadAddress}
            setRoadAddress={setRoadAddress}
            detailAddress={detailAddress}
            setDetailAddress={setDetailAddress}
            extraAddress={extraAddress}
            setExtraAddress={setExtraAddress}
          />
        </VStack>
        <div className='h-12 text-red-400'>{errorMessage}</div>
        {/* <Spacer /> */}
        <BtnBottom text='조회' action={onClickCheck}></BtnBottom>
      </VStack>
    </div>
  );
};
export default WorkPlaceAdd;
