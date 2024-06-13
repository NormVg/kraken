import React,{useContext, useState} from 'react'


import '../css/FileExplorerStyle.css'

import { AppEHContext } from '../context/AppContext';
import FeFolder from './FeComponents/FeFolder';

const fs = window.require('fs');
const path = window.require('path');

function walkDirAsObject(dirPath) {
  let idCounter = 1;  // Initialize a counter for unique IDs

  // Define a recursive function to walk the directory
  const walk = (currentPath) => {
      const structure = {
          id: idCounter.toString(),
          name: path.basename(currentPath),
          isFolder: true,
          items: []
      };
      idCounter++;

      // Read all files and directories within the current path
      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
          const itemPath = path.join(currentPath, item);
          const stats = fs.statSync(itemPath);

          if (stats.isDirectory()) {
              // Recursively walk through the directory
              const folderStructure = walk(itemPath);
              structure.items.push(folderStructure);
          } else {
              // Add file to the structure
              structure.items.push({
                  id: idCounter.toString(),
                  name: item,
                  isFolder: false,
                  items: []
              });
              idCounter++;
          }
      });

      return structure;
  };

  // Return the final structure starting from the provided directory path
  const rootStructure = walk(dirPath);
  rootStructure.name = "root";  // Name the root directory
  const dirData = JSON.stringify(rootStructure, null, 2)
  return dirData;
}


function FileExplorer() {
  const EditorPathContext = useContext(AppEHContext)
  const EditorPath = EditorPathContext.AehValue
  const [DirAvalable, SetDirAvalable] = useState(false)
  const [DirObj,SetDirObj] = useState(null)

  if (EditorPath){
    try{
      var dirdata =  walkDirAsObject(EditorPath)
      if (!DirAvalable){
        SetDirAvalable(true)
        SetDirObj(dirdata)      
        console.log(dirdata)
      }
      
    }catch{
      if (DirAvalable){
        SetDirAvalable(false)
      }
      
    }
  }
  return (
    <div id='fe-box'>
        { DirAvalable ? <FeFolder explorer={DirObj} /> : <>not AehValue</> }
    </div>
  )
}

export default FileExplorer