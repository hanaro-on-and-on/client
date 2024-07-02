import clsx from 'clsx';

type Prop = {
  text: string;
  action: () => void;
  className?: string;
};

const BtnPrimary = ({ text, action, className = '' }: Prop) => {
  return (
    <>
      <button
        type='button'
        className={clsx(
          'bg-hanaLightGreen rounded-md px-5 text-white font-semibold h-[45px] text-center',
          className
        )}
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};

export default BtnPrimary;
