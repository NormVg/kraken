import { createContext, useState } from 'react';

export const SideBarContext = createContext(null);

export const SideBarContextProvider = (props) => {
  const [FeToggleStyle, SetFeToggleStyle] = useState({
    fe: '15px',
    tool: '13px',
  });
  const [FeState, SetFeState] = useState(true);

  function switchFe() {
    SetFeState(true);
    SetFeToggleStyle({
      fe: '15px',
      tool: '12px',
      febg: 'white',
      toolbg: 'grey',
    });
  }

  function switchTool() {
    SetFeState(false);
    SetFeToggleStyle({
      fe: '12px',
      tool: '15px',
      febg: 'grey',
      toolbg: 'white',
    });
  }

  return (
    <SideBarContext.Provider value={{ switchFe, switchTool, FeToggleStyle,FeState }}>
      {props.children}
    </SideBarContext.Provider>
  );
};
