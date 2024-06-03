import { Terminal ,ITerminalOptions} from '@xterm/xterm'

import React, { useEffect, useRef } from 'react'
import "@xterm/xterm/css/xterm.css"

const xtermjsTheme = {
  foreground: '#F8F8F8',
  background: '#0A0D18',
  selectionBackground: '#5DA5D533',
  selectionInactiveBackground: '#555555AA',
  black: '#45475A',
  brightBlack: '#585B70',
  red: '#F38BA8',
  brightRed: '#FF7272',
  green: '#5BCC5B',
  brightGreen: '#72FF72',
  yellow: '#CCCC5B',
  brightYellow: '#FFFF72',
  blue: '#5D5DD3',
  brightBlue: '#7279FF',
  magenta: '#BC5ED1',
  brightMagenta: '#E572FF',
  cyan: '#5DA5D5',
  brightCyan: '#72F0FF',
  white: '#F8F8F8',
  brightWhite: '#FFFFFF'
};


const terminal = new Terminal(
  {
    theme: xtermjsTheme
  }
)


function MyTerminal() {
  
  terminal.onData((e)=>{
    // terminal.write(e)
    console.log(e)
  })
  const terminalRef = useRef()
  
  useEffect(()=>{
    if (!terminalRef.current){
      return
    }
    terminal.open(terminalRef.current);
    // terminal.write('$ ')
  },[terminalRef])


  return (
    <div ref={terminalRef}>MyTerminal</div>
  )
}

export default MyTerminal