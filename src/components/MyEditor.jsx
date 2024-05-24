import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';

import { python } from '@codemirror/lang-python';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

import "../css/MyEditorStyle.css"

const myTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#1C1C2A',
      backgroundImage: '',
      foreground: '#54B527',
      caret: '#7f849c',
      selection: '#FF5F5F35', 
      selectionMatch: '#D70081',
      lineHighlight: '#272736',
      gutterBorder: '1px solid #9DA1D3',
      gutterBackground: '#1C1C2A',
      gutterForeground: '#9DA1D3',
    },
    styles: [
      { tag: t.comment, color: '#bac2de' },
      { tag: t.variableName, color: '#bac2de' },
      { tag: [t.string, t.special(t.brace)], color: '#a6e3a1' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166 ' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.className, color: '#5c6166' },
      { tag: t.definition(t.typeName), color: '#9374BE' },
      { tag: t.definition, color: '#9374BE' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#fab387' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
    ],
  });

const MyEditor = () => {
  const handleEditorChange = (value, event) => {
    console.log("Editor content:", value);
  };
//   const [value, setValue] = React.useState("console.log('hello world!');");
  return (
    <div>
      <CodeMirror
        // value={value}
        height="200px"
        theme={myTheme}
        extensions={[ python({ jsx: true })]}
        onChange={handleEditorChange}
      />
      
    </div>
  );
};

export default MyEditor;
