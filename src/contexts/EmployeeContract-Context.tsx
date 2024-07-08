import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react';
import {
  EmployeeContract,
  FirstInfo,
  SecondInfo,
  ThirdInfo,
} from '../types/contract';

type EmployeeContractContextProps = {
  employeeContract: Partial<EmployeeContract> | undefined;
  prepareInfo: (workPlaceName: string) => void;
  addFirstInfo: (firstInfo: FirstInfo) => void;
  addSecondInfo: (secondInfo: SecondInfo) => void;
  addThirdInfo: (thirdInfo: ThirdInfo) => void;
  resetInfo: () => void;
  firstInfo: FirstInfo | undefined;
  setFirstInfo: (first: FirstInfo) => void;
  secondInfo: SecondInfo | undefined;
  setSecondInfo: (second: SecondInfo) => void;
  thirdInfo: ThirdInfo | undefined;
  setThirdInfo: (third: ThirdInfo) => void;
  contract: EmployeeContract | undefined;
};

const EmployeeContractContext = createContext<EmployeeContractContextProps>({
  employeeContract: undefined,
  prepareInfo: () => {},
  addFirstInfo: () => {},
  addSecondInfo: () => {},
  addThirdInfo: () => {},
  resetInfo: () => {},
  firstInfo: undefined,
  setFirstInfo: () => {},
  secondInfo: undefined,
  setSecondInfo: () => {},
  thirdInfo: undefined,
  setThirdInfo: () => {},
  contract: undefined,
});

type ReducerAction =
  | { type: 'PREPARE'; data: string }
  | { type: 'FIRST'; data: FirstInfo }
  | { type: 'SECOND'; data: SecondInfo }
  | { type: 'THIRD'; data: ThirdInfo }
  | { type: 'RESET' };

const reducer = (
  employeeContract: Partial<EmployeeContract> | undefined,
  action: ReducerAction
): Partial<EmployeeContract> | undefined => {
  switch (action.type) {
    case 'PREPARE':
      return {
        ...employeeContract,
        workPlaceNm: action.data,
      };
    case 'FIRST':
      return {
        ...employeeContract,
        ...action.data,
      };
    case 'SECOND':
      return {
        ...employeeContract,
        ...action.data,
      };
    case 'THIRD':
      return {
        ...employeeContract,
        ...action.data,
      };
    case 'RESET':
      return undefined; // 기본 상태로 리셋
    default:
      return employeeContract;
  }
};

export const EmployeeContractProvider = ({ children }: PropsWithChildren) => {
  const [employeeContract, dispatch] = useReducer(reducer, undefined);

  const [firstInfo, setFirstInfo] = useState<FirstInfo | undefined>(undefined);
  const [secondInfo, setSecondInfo] = useState<SecondInfo | undefined>(
    undefined
  );
  const [thirdInfo, setThirdInfo] = useState<ThirdInfo | undefined>(undefined);
  const [contract, setContract] = useState<EmployeeContract | undefined>(
    undefined
  );

  // const create = () => {
  //   if (firstInfo && secondInfo && thirdInfo) {
  //     setContract({ ...firstInfo, ...secondInfo });
  //   }
  // };

  const prepareInfo = (workPlaceName: string) => {
    dispatch({
      type: 'PREPARE',
      data: workPlaceName,
    });
  };

  const addFirstInfo = (firstInfo: FirstInfo) => {
    dispatch({
      type: 'FIRST',
      data: firstInfo,
    });
  };
  const addSecondInfo = (secondInfo: SecondInfo) => {
    dispatch({
      type: 'SECOND',
      data: secondInfo,
    });
  };
  const addThirdInfo = (thirdInfo: ThirdInfo) => {
    dispatch({
      type: 'THIRD',
      data: thirdInfo,
    });
  };
  const resetInfo = () => {
    dispatch({
      type: 'RESET',
    });
  };

  return (
    <EmployeeContractContext.Provider
      value={{
        employeeContract,
        prepareInfo,
        addFirstInfo,
        addSecondInfo,
        addThirdInfo,
        resetInfo,
        firstInfo,
        setFirstInfo,
        secondInfo,
        setSecondInfo,
        thirdInfo,
        setThirdInfo,
        contract,
      }}
    >
      {children}
    </EmployeeContractContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployeeContract = () => useContext(EmployeeContractContext);
