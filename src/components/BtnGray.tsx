import clsx from 'clsx';

type Prop = {
  text: string;
  action: () => void;
  className?: string;
};

const BtnGray = ({ text, action, className }: Prop) => {
  return (
    <>
      <button
        type='button'
        className={clsx(
          `bg-slate-300 rounded-md px-5 text-white font-semibold h-[45px] text-center ${className}`
        )}
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};

export default BtnGray;
