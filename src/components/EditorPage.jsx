import React from 'react'
import MyEditor from './MyEditor'
import { useSearchParams } from 'react-router-dom'
import FocusBar from './FocusBar'


const EditorPage = () => {
    const [prams,setPrams] = useSearchParams()
    const folderPath = prams.get("path")
    
  return (
    <>
        <MyEditor/>
        <FocusBar/>
    </>
  )
}

export default EditorPage