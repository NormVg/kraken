import { createContext, useState } from 'react';

export const FocusBarContext = createContext(null);

export const FocusBarContextProvider = (props) => {
  const [ScrollShiftValue,setScrollShiftValue] = useState("0px")
  return (
    <FocusBarContext.Provider value={{ ScrollShiftValue,setScrollShiftValue }}>
      {props.children}
    </FocusBarContext.Provider>
  );
};
