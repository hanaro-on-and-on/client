import clsx from 'clsx';

type Prop = {
  color: 'red' | 'blue';
};
const Circle = ({ color }: Prop) => {
  return (
    <div
      className={clsx(
        'rounded-full text-white font-semibold flex justify-center items-center w-[20px] h-[20px] ',
        {
          'bg-red-500': color === 'red',
          'bg-blue-500': color === 'blue',
        }
      )}
    >
      +
    </div>
  );
};

export default Circle;
