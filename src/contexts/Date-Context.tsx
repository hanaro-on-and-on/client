import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

enum ACTION {
  SET_YEAR = 'set-year',
  SET_MONTH = 'set-month',
  SET_YEARMONTH = 'set-yearmonth',
}

type Action =
  | {
      type: ACTION.SET_YEAR | ACTION.SET_MONTH;
      payload: number;
    }
  | { type: ACTION.SET_YEARMONTH; payload: Date };

type ProviderProps = {
  children: ReactNode;
};

type ContextProp = {
  date: Date;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setYearMonth: (date: Date) => void;
  getYear: () => number;
  getMonth: () => number;
};

const defaultContextProp: ContextProp = {
  date: new Date(),
  setYear: () => {},
  setMonth: () => {},
  setYearMonth: () => {},
  getYear: () => {
    return -1;
  },
  getMonth: () => {
    return -1;
  },
};

const DateContext = createContext<ContextProp>(defaultContextProp);

const reducer = (date: Date, { type, payload }: Action) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  switch (type) {
    case ACTION.SET_YEAR:
      year = payload;
      break;
    case ACTION.SET_MONTH:
      month = payload;
      break;

    case ACTION.SET_YEARMONTH:
      return payload;

    default:
      return date;
  }

  date.setFullYear(year);
  date.setMonth(month);

  return new Date(date);
};

export const DateProvider = ({ children }: ProviderProps) => {
  const today = new Date();
  const [selectedDate, dispatch] = useReducer(reducer, today);

  const setYear = (year: number) => {
    dispatch({ type: ACTION.SET_YEAR, payload: year });
  };

  const setMonth = (month: number) => {
    dispatch({ type: ACTION.SET_MONTH, payload: month });
  };

  const setYearMonth = (date: Date) => {
    dispatch({ type: ACTION.SET_YEARMONTH, payload: date });
  };

  const getYear = () => {
    return selectedDate.getFullYear();
  };

  const getMonth = () => {
    return selectedDate.getMonth();
  };

  return (
    <DateContext.Provider
      value={{
        date: selectedDate,
        setYear,
        setMonth,
        setYearMonth,
        getYear,
        getMonth,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => useContext(DateContext);
