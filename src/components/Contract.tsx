import { useEffect, useState } from 'react';
import ApiClient from '../api/apiClient';

type Prop = {
  contractId: number;
};
const Contract = ({ contractId }: Prop) => {
  const [contract, setContract] = useState<EmployeePaperGetResponse | null>(
    null
  );

  const getContract = async (id: number) => {
    try {
      const response: EmployeePaperGetResponse =
        await ApiClient.getInstance().employeeGetContract(id);
      console.log('res', response);
      setContract(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractId) getContract(contractId);
  }, [contractId]);

  return (
    <>
      {contract && (
        <table className='border-collapse border border-gray-200 max-w-full w-full mx-auto text-sm'>
          <thead className='w-full'>
            <tr>
              <th className='border border-gray-200 px-4 py-2'>계약서 항목</th>
              <th className='border border-gray-200 px-4 py-2'>내용</th>
            </tr>
          </thead>
          <tbody className='max-w-full'>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                근무지
              </td>
              <td className='border border-gray-200 px-4 py-2 text-end'>
                {contract?.workPlaceName}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end '>
                근무지 주소
              </td>
              <td className='border border-gray-200 px-4 py-2 text-end'>
                {contract?.workSite}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                근무 내용
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.workDetail}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                근무 시작일
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.workStartDate.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                나의 주소
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.employeeAddress}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                나의 연락처
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.employeePhone}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                휴무일
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.restDayOfWeek}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                시급
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.payPerHour}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                급여일
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                {contract?.paymentDay}
              </td>
            </tr>
            <tr>
              <td className='border border-gray-200 px-4 py-2 bg-gray-100 font-semibold text-end'>
                근무일
              </td>
              <td className='border border-gray-200 px-4 py-2  text-end'>
                <div className='flex flex-col gap-2'>
                  {contract?.workTimes?.map((item, index) => (
                    <>
                      <div
                        key={item.workDayOfWeek}
                        className='flex justify-between '
                      >
                        <div className='text-start font-semibold text-base'>
                          {item.workDayOfWeek.charAt(0)}
                        </div>
                        <div className='flex flex-col gap-1'>
                          <div className='text-sm'>
                            {item.workStartTime}-{item.workEndTime}
                          </div>
                          <div className='text-sm'>
                            (휴) {item.restStartTime}-{item.restEndTime}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Contract;
