import { getColor } from '../../utils/get-color';

type WorkPlaceNameProps = {
  name: string;
  colorType: string;
};

const WorkPlaceName = ({ name, colorType }: WorkPlaceNameProps) => {
  return (
    <span className='flex gap-2 items-center'>
      <span
        className={`rounded-full text-white font-semibold flex justify-center items-center w-[20px] h-[20px] ${getColor(colorType)}`}
      ></span>
      {name}
    </span>
  );
};

export default WorkPlaceName;
