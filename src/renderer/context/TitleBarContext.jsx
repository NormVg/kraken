import { createContext, useState } from 'react';

export const TitleBarContext = createContext(null);


export const TitleBarContextProvider = (props) => {
  const [TitleValue, setTitleValue] = useState("Kraken")
  return (
    <TitleBarContext.Provider value={{ TitleValue, setTitleValue }}>
      {props.children}
    </TitleBarContext.Provider>
  );
};
