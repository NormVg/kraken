import { createContext, useState } from 'react';

export const AppEHContext = createContext(null);

export const AppEHProvider = (props) => {
  const [AehValue, SetAehValue] = useState(null);

  return (
    <AppEHContext.Provider value={{ AehValue, SetAehValue }}>
      {props.children}
    </AppEHContext.Provider>
  );
};
