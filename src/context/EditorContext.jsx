import { createContext, useState } from "react";

export const EditorSidebarToggleContext = createContext(null);

export const EditorSidebarToggleProvider = (props) => {
  const [Est, SetEst] = useState(false);
  const [EstValue, SetEstValue] = useState(
    {
        edtior: {
          mywidth: "99%",
        },
        sidebar:{
          mywidth:"0"
        },
        focusbar:{
          mywidth:"calc( 100% - 50px )",
          marginright:"25px"
        }
      }
  );

  function EstToggle() {
    
    if (Est == false) {
      SetEst(true);
      SetEstValue({
        edtior: {
          mywidth: "calc(99% - 35%)",
        },
        sidebar:{
          mywidth:"35%"
        },
        focusbar:{
          mywidth:"calc( 100% - 50px - 35%)",
          marginright:"calc(25px + 35%)"
        }
      });
      return;
    }
    if (Est == true) {
      SetEst(false);
      SetEstValue({
        edtior: {
          mywidth: "99%",
        },
        sidebar:{
          mywidth:"0"
        },
        focusbar:{
          mywidth:"calc( 100% - 50px )",
          marginright:"25px"
        }
      });
      return;
    }
  }
  return (
    <EditorSidebarToggleContext.Provider value={{ Est, EstToggle, EstValue }}>
      {props.children}
    </EditorSidebarToggleContext.Provider>
  );
};
