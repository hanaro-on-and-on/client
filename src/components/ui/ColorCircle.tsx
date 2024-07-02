import { getColor } from '../../utils/get-color';

type ColorCircleProps = {
  workPlaceColor: string;
};

const ColorCircle = ({ workPlaceColor }: ColorCircleProps) => {
  return (
    <div
      className={`h-6 w-6 rounded-full text-xs ${getColor(workPlaceColor)} ${getColor(workPlaceColor, 'TEXT')} items-center justify-center`}
    >
      원
    </div>
  );
};
export default ColorCircle;
