type Prop = {
  text: string;
  action: { (): void }[];
};

const BtnGray = ({ text, action }: Prop) => {
  return (
    <>
      <button
        type='button'
        className='bg-slate-300 rounded-md px-5 text-white font-semibold h-[45px] text-center'
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

export default BtnGray;
