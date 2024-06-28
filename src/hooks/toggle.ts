import { useState } from 'react';

const useToggle = (init: boolean = false) => {
  const [flag, setFlag] = useState<boolean>(init);

  const toggle = () => {
    setFlag((prev) => !prev);
  };

  return { flag, toggle };
};

export default useToggle;
