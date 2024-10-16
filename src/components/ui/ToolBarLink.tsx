import { NavLink } from 'react-router-dom';

// const mockData = ['나의 사업장', '캘린더'];

type ToolBarLinkProps = {
  options: LinkData[];
};

const ToolBarLink = ({ options }: ToolBarLinkProps) => {
  return (
    <>
      <div className='flex justify-evenly h-[50px] items-center border-b border-gray-200 w-full bg-white'>
        {options.map((option) => {
          return (
            <NavLink
              className={({ isActive }) =>
                `bg-transparent px-3 py-3 ${isActive ? 'text-hanaLightGreen border-b-2 border-hanaLightGreen' : ''}`
              }
              key={option.idx}
              to={option.url}
            >
              {option.title}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default ToolBarLink;
