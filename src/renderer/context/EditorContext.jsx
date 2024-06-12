import { createContext, useState } from "react";

export const EditorSidebarToggleContext = createContext(null);

export const EditorSidebarToggleProvider = (props) => {
  const [Est, SetEst] = useState(false);
  const [EstValue, SetEstValue] = useState({
    edtior: {
      mywidth: "99%",
    },
    sidebar: {
      mywidth: "0",
    },
    focusbar: {
      mywidth: "calc( 100% - 75px )",
      marginright: "25px",
    },
    term:{
      mywidth: "99vw",
    }
  });

  function EstToggle() {
    if (Est == false) {
      SetEst(true);
      SetEstValue({
        edtior: {
          mywidth: "calc(99% - 35%)",
        },
        sidebar: {
          mywidth: "35%",
        },
        focusbar: {
          mywidth: "calc( 100% - 75px - 35%)",
          marginright: "calc(25px + 35%)",
        },
        term:{
          mywidth: "40vw ",
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
        sidebar: {
          mywidth: "0",
        },
        focusbar: {
          mywidth: "calc( 100% - 75px )",
          marginright: "25px",
        },
        term:{
          mywidth: "99vw",
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




export const EditorWorkSpaceDisplayContext = createContext(null);

export const EditorWorkSpaceDisplayProvider = (props) => {
  const [Ewd,SetEwd] = useState(
    {
      main:{
        myclassOn:"main-on",
        myclassOff:"main-off",
        state:true
      },
      term:{
        myclassOn:"term-on",
        myclassOff:"term-off",
        state:false
      }
    }
  );

  function ToggleWorkSpace(mytype) {
    var temp = {...Ewd}
    
    Object.keys(temp).forEach(element => {
      console.log(element,"hehe")
      if (element == mytype){
        
        temp[element].state = true
      }else{
        temp[element].state = false
        
      }

    })
    console.log(temp)
    SetEwd(temp)

  }

  

  return (
    <EditorWorkSpaceDisplayContext.Provider value={{Ewd,ToggleWorkSpace}}>
      {props.children}
    </EditorWorkSpaceDisplayContext.Provider>
  );
};


export const EditorProjectPathContext = createContext(null);

export const EditorProjectPathProvider = (props) => {
  
  const [EppValue, SetEppValue] = useState(null);


  return (
    <EditorProjectPathContext.Provider value={{ EppValue,SetEppValue }}>
      {props.children}
    </EditorProjectPathContext.Provider>
  );
};

