import { useNavigate } from 'react-router-dom';
import BtnBottom from '../../components/BtnBottom';
import Frame from '../../components/Frame';
import WhiteBox from '../../components/ui/WhiteBox';
import Wrapper from '../../components/Wrapper';
import { useEffect, useRef, useState } from 'react';
import ModalBottom from '../../components/ModalBottom';
import InputBorder from '../../components/InputBorder';
import InputBorderSelect from '../../components/InputBorderSelect';
import ModalCenter from '../../components/ModalCenter';
import ApiClient from '../../api/apiClient';

const BankList: SelectionProp[] = [
  { text: '하나은행', value: 'HANA' },
  { text: '신한은행', value: 'SHIN_HAN' },
  { text: '국민은행', value: 'KUK_MIN' },
  { text: '우리은행', value: 'URI' },
  { text: 'IBK기업은행', value: 'IBK' },
  { text: '농협은행', value: 'NONG_HYEOP' },
  { text: '수협은행', value: 'SU_HYEOP' },
  { text: '부산은행', value: 'BUSAN' },
];

const EmployeeAddMainAccount = () => {
  const [isModalOpen, setIsModal] = useState(false);
  const [isModalCenterOpen, setIsModalCenter] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>('');
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const bankRef = useRef<HTMLSelectElement | null>(null);
  const accountRef = useRef<HTMLInputElement | null>(null);
  const checkRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate();

  const closeModal = () => {
    setIsModal(false);
  };

  const openModal = () => {
    if (!validation()) return;
    setIsModal(true);
  };

  const validation = () => {
    const name = nameRef.current?.value;
    const bank = BankList[bankRef.current?.selectedIndex || 0].text;
    const account = accountRef.current?.value;
    const checked = checkRef.current?.checked;

    if (!name || !bank || !account || !checked) {
      setModalMsg('값을 모두 입력해주세요');
      setIsModalCenter(true);
      return false;
    }

    return true;
  };

  const registerAccount = async () => {
    if (!validation()) return;

    const name = nameRef.current?.value;
    const account = accountRef.current?.value;

    try {
      const response = await ApiClient.getInstance().registerEmployeeAccount({
        accountNumber: account!,
        employeeNm: name!,
      });

      if (response.employeeId) {
        setDone(true);
        setModalMsg('등록 성공');
      }
    } catch (err) {
      console.error(err);
      setModalMsg('등록 실패');
      setIsModal(false);
      setIsModalCenter(true);
    }
  };

  useEffect(() => {
    nameRef.current?.focus();
    nameRef.current?.click();
  }, []);

  return (
    <>
      {isModalCenterOpen && (
        <ModalCenter
          title='알림'
          closeModal={() => setIsModalCenter(false)}
          confirmAction={
            done
              ? () => navigation('/part-time/worktime')
              : () => {
                  setIsModalCenter(false);
                }
          }
        >
          <div>{modalMsg}</div>
        </ModalCenter>
      )}
      {isModalOpen && (
        <ModalBottom
          btnBottom
          btnText='동의하기'
          title='개인정보 제공 동의'
          closeModal={closeModal}
          action={() => registerAccount()}
        >
          <div>개인정보 약관</div>
        </ModalBottom>
      )}
      <Frame>
        <div className='flex flex-col justify-between w-full h-full py-5 gap-2'>
          <Wrapper title='알바생 대표 계좌 등록'>
            <div className=' flex flex-col justify-start gap-2'>
              {/* 이름 */}
              <InputBorder
                title='이름'
                placeHolder='성명을 입력해주세요'
                ref={nameRef}
              />
              {/* 은행 */}
              <InputBorderSelect
                title='은행'
                ref={bankRef}
                selectionList={BankList}
              />
              {/* 계좌번호 */}
              <InputBorder
                title='계좌번호'
                ref={accountRef}
                placeHolder='- 제외하고 입력해주세요'
              />

              <WhiteBox border className='flex justify-between'>
                <div className='flex justify-between items-center py-1 '>
                  <div className='w-[10px]'>
                    <input
                      type='checkbox'
                      ref={checkRef}
                      className='w-[20px]'
                    />
                  </div>

                  <div className='text-end text-sm font-bold'>
                    개인정보 이용 동의
                  </div>
                </div>
              </WhiteBox>
            </div>
          </Wrapper>

          <BtnBottom
            text='설정하기'
            action={() => {
              openModal();
            }}
          />
        </div>
      </Frame>
    </>
  );
};

export default EmployeeAddMainAccount;
