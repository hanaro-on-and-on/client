import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Attendance } from '../types/calendar';

type AttendanceContextProps = {
  attendance: Attendance | undefined;
  changeAttendance: (attendance: Attendance) => void;
};

const AttendanceContext = createContext<AttendanceContextProps>({
  attendance: undefined,
  changeAttendance: () => {},
});

type ReducerAction = { type: 'CHANGE'; data: Attendance };

const reducer = (attendance: Attendance | undefined, action: ReducerAction) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...action.data };
    default:
      return attendance;
  }
};

export const AttendanceProvider = ({ children }: PropsWithChildren) => {
  const [attendance, dispatch] = useReducer(reducer, undefined);

  const changeAttendance = (attendance: Attendance) => {
    dispatch({
      type: 'CHANGE',
      data: attendance,
    });
  };

  return (
    <AttendanceContext.Provider value={{ attendance, changeAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAttendance = () => useContext(AttendanceContext);
