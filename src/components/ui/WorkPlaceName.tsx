import { getColor } from '../../utils/get-color';

type WorkPlaceNameProps = {
  name: string;
  colorType: string;
};

const WorkPlaceName = ({ name, colorType }: WorkPlaceNameProps) => {
  return (
    <span className={`px-3 py-1 rounded-xl text-sm ${getColor(colorType)}`}>
      {name}
    </span>
  );
};

export default WorkPlaceName;
