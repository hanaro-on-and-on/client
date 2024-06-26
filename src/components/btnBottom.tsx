type Prop = {
  text: string;
  action: { (): void }[];
};

const BtnBottom = ({ text, action = [] }: Prop) => {
  return (
    <>
      <button
        type='button'
        className='bg-hanaLightGreen rounded-md min-w-full text-white font-semibold h-[45px] text-center'
        onClick={() => {
          action?.map((item) => {
            item();
          });
        }}
      >
        {text}
      </button>
    </>
  );
};

export default BtnBottom;
