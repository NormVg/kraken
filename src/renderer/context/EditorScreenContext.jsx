import { createContext, useState } from 'react';

export const EditorScreenContext = createContext(null);


export const EditorScreenProvider = (props) => {
  const [EditorScreenValue, SetEditorScreenValue] = useState(["main","term"]);
  const [WebAppScreenValue, SetWebAppScreenValue] = useState( [] );
  const [CurrentScreenValue, SetCurrentScreenValue] = useState( "main" );
  
  
  const kk =  [...WebAppScreenValue]
  const bb = [...EditorScreenValue]
  function AddToEditorScreen(n,u,i){

    const target = {"name":n,"url":u,"icon":i}

    const exists = kk.some(item => JSON.stringify(item) === JSON.stringify(target));
    
    

    if (exists){
      console.log("add nai ker raha hu bahi")
      
    }else{
      kk.push(target)
      SetWebAppScreenValue(kk)
      console.log("a",kk)
      bb.push(n)
      SetEditorScreenValue(bb)
      console.log(bb)


    }
  }


  function ToggleWorkScreen(name){
    console.log(name,"ll")
    SetCurrentScreenValue(name)
  }




  return (
    <EditorScreenContext.Provider value={{  ToggleWorkScreen, EditorScreenValue, SetEditorScreenValue , WebAppScreenValue, SetWebAppScreenValue,AddToEditorScreen , CurrentScreenValue, SetCurrentScreenValue }}>
      {props.children}
    </EditorScreenContext.Provider>
  );
};
