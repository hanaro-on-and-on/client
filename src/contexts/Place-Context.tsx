import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { PlaceFirstInfo, Place } from '../types/contract';

type PlaceContextProps = {
  place: Place | undefined;
  setPlace: (place: Place) => void;
  firstInfo: PlaceFirstInfo | undefined;
  setFirstInfo: (firstInfo: PlaceFirstInfo) => void;
};

const PlaceContext = createContext<PlaceContextProps>({
  place: undefined,
  setPlace: () => {},
  firstInfo: undefined,
  setFirstInfo: () => {},
});

export const PlaceProvider = ({ children }: PropsWithChildren) => {
  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [firstInfo, setFirstInfo] = useState<PlaceFirstInfo | undefined>(
    undefined
  );

  return (
    <PlaceContext.Provider value={{ place, firstInfo, setPlace, setFirstInfo }}>
      {children}
    </PlaceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlace = () => useContext(PlaceContext);
