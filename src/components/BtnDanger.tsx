import clsx from 'clsx';

type Prop = {
  text: string;
  action: () => void;
  className?: string;
};

const BtnDanger = ({ text, action, className = '' }: Prop) => {
  return (
    <>
      <button
        type='button'
        className={clsx(
          'bg-red-500 rounded-md px-5 text-white font-semibold h-[45px] text-center',
          className
        )}
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};

export default BtnDanger;
