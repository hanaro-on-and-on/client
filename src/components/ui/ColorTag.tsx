import clsx from 'clsx';

type Prop = {
  className?: string;
  children: string;
};
const ColorTag = ({ className = '', children }: Prop) => {
  return (
    <div
      className={clsx(
        'px-2 text-sm rounded-3xl text-center flex flex-col justify-center',
        className
      )}
    >
      <div>{children}</div>
    </div>
  );
};

export default ColorTag;
