import { useState } from 'react';
import ToolBarDetail from './ToolBarDetail';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// const mockData = ['나의 사업장', '캘린더'];

type LinkData = {
  idx: number;
  title: string;
  url: string;
};

type ToolBarLinkProps = {
  options: LinkData[];
};

const ToolBarLink = ({ options }: ToolBarLinkProps) => {
  return (
    <>
      <div className='flex justify-evenly min-h-12 items-center border-b border-gray-200'>
        {options.map((option) => {
          return (
            <NavLink
              className={({ isActive }) =>
                `bg-white px-8 py-3 ${isActive ? 'text-hanaLightGreen border-b-2 border-hanaLightGreen' : ''}`
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
