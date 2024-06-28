import clsx from 'clsx';

type Prop = {
  color: 'green' | 'gray';
  text: string;
  onClick: () => void;
};

const BtnBorder = ({ color = 'green', text, onClick = () => {} }: Prop) => {
  return (
    <button
      type='button'
      className={clsx('px-3 py-1 text-sm rounded-lg', {
        'text-hanaLightGreen border border-hanaLightGreen bg-transparent ':
          color === 'green',
        'text-gray-600 border border-gray-400': color === 'gray',
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BtnBorder;
