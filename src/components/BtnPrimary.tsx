type Prop = {
  text: string;
  action: () => void;
};

const BtnPrimary = ({ text, action }: Prop) => {
  return (
    <>
      <button
        type='button'
        className='bg-hanaLightGreen rounded-md px-5 text-white font-semibold h-[45px] text-center'
        onClick={action}
      >
        {text}
      </button>
    </>
  );
};

export default BtnPrimary;
