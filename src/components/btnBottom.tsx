type Prop = {
  text: string;
  action: () => void | undefined;
};

const BtnBottom = ({ text, action }: Prop) => {
  return (
    <>
      <button
        type='button'
        className='bg-hanaLightGreen rounded-md min-w-full text-white font-semibold h-[45px] text-center'
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};

export default BtnBottom;
