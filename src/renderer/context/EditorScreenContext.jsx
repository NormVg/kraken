import { createContext, useState } from 'react';

export const EditorScreenContext = createContext(null);

function getNewIndex(index, direction, array) {
  const arrayLength = array.length;

  if (arrayLength === 0) {
      throw new Error("Array is empty");
  }

  if (direction === "left") {
      return (index - 1 + arrayLength) % arrayLength;
  } else if (direction === "right") {
      return (index + 1) % arrayLength;
  } else {
      throw new Error("Invalid direction. Use 'left' or 'right'.");
  }
}

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



  function calcScrollShiftvalue(){
    const EScreenValue = [...EditorScreenValue] 
    const EScreen = CurrentScreenValue
    const EScreenIndex = EScreenValue.indexOf(EScreen)
    

    
    const len = EScreenValue.length-1
    const index = getNewIndex(EScreenIndex,"right",EScreenValue) 
    
    const pxv =  `${((index/len)*55)}px` 
    console.log(len,index,pxv)
    return pxv
    
  }

  return (
    <EditorScreenContext.Provider value={{ calcScrollShiftvalue, ToggleWorkScreen, EditorScreenValue, SetEditorScreenValue , WebAppScreenValue, SetWebAppScreenValue,AddToEditorScreen , CurrentScreenValue, SetCurrentScreenValue }}>
      {props.children}
    </EditorScreenContext.Provider>
  );
};
