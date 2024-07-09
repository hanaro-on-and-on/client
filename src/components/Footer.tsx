const Footer = () => {
  return (
    <>
      <div className='flex flex-col w-full h-[300px] bg-gray-100 py-3 text-[10px]'>
        <div className=' flex justify-center text-gray-500   border-b border-b-slate-200 py-3'>
          <div className='w-[70%] flex gap-2 justify-center '>
            <div>은행 소개 |</div>
            <div>고객센터 |</div>
            <div>개인정보처리방침</div>
          </div>
        </div>
        <div className='py-3'>
          <div className='flex justify-center gap-5 text-slate-500  mb-5'>
            <div>하나 원큐</div>
            <div>하나 카드</div>
            <div>글로벌 네트워크</div>
          </div>
          <div className='text-slate-400 '>
            <div>
              <div>은행업무 1599-1111 / 1588-1111</div>
              <div>전자금융상담 전용 1588-3555</div>
            </div>
          </div>
        </div>
        <div className='flex justify-center bg-gray-200 text-gray-400 h-full  py-5'>
          <div className='w-[90%] flex flex-col items-center '>
            <div>서울특별시 중구 을지로35(을지로1가, 하나은행)</div>
            <div>
              주식회사 하나은행 | 대표자 이승열 | 사업자등록번호 : 202-81-14695
            </div>
            <div>Hana Bank. All rights reserved</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
