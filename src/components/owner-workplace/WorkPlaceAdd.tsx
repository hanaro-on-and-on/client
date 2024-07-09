import Nav from '../Nav';
import { VStack } from '../ui/Stack';

const WorkPlaceAdd = () => {
  return (
    <div style={{ height: '90vh' }}>
      <Nav title='사장님 ON'></Nav>

      <VStack className='p-6'>
        <h2 className='text-2xl text-left font-bold'>사업자이신가요?</h2>
        <h3 className='text-left font-semibold text-gray-400'>
          사업자등록번호로 사업장을 등록할 수 있어요.
        </h3>
      </VStack>
    </div>
  );
};
export default WorkPlaceAdd;
