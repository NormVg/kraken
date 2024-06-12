import { Terminal, ITerminalOptions } from "@xterm/xterm";

import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from '@xterm/addon-web-links';
import { ClipboardAddon } from '@xterm/addon-clipboard';
import { CanvasAddon } from '@xterm/addon-canvas';

import React, { useContext, useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
import "../css/MyTerminalStyle.css"




const { ipcRenderer } = window.require('electron');





const xtermjsTheme = {
  foreground: "#CDD6F4",
  background: "#0A0D18",
  selectionBackground: "#5DA5D533",
  selectionInactiveBackground: "#555555AA",
  black: "#45475A",
  brightBlack: "#585B70",
  red: "#F38BA8",
  brightRed: "#D31F6B",
  green: "#A6E3A1",
  brightGreen: "#A6E3A1",
  yellow: "#F9E2AF",
  brightYellow: "#F9E2AF",
  blue: "#89B4FA",
  brightBlue: "#89B4FA",
  magenta: "#F5C2E7",
  brightMagenta: "#F5C2E7",
  cyan: "#94E2D5",
  brightCyan: "#94E2D5",
  white: "#BAC2DE",
  brightWhite: "#A6ADC8",
};

const terminal = new Terminal({
  theme: xtermjsTheme,
  convertEol: true,
  allowProposedApi: true,
  backend: 'conpty',
  buildNumber: 22621,
  
  
});

const fitAddon = new FitAddon();
terminal.loadAddon(fitAddon);

const clipboardAddon = new ClipboardAddon();
terminal.loadAddon(clipboardAddon);

terminal.loadAddon(new WebLinksAddon());

terminal.loadAddon(new CanvasAddon());



terminal.onKey((e) => {
  console.log(e.key)
  ipcRenderer.send("terminal-into", e.key);
  // fitAddon.fit();
});




ipcRenderer.on("terminal-incData", (event, data) => {
  console.log(data)
  terminal.write(data);
  fitAddon.fit();

});




terminal.write("welcome to 🐙  terminal, Click to start \r\n")



function MyTerminal() {
  fitAddon.fit()
  const terminalRef = useRef();

  useEffect(() => {
    
    if (!terminalRef.current) {
      return;
    }
    terminal.open(terminalRef.current);
    
    fitAddon.fit();
    
    
  }, [terminalRef]);
  
  
  return <div  id="myterminal" ref={terminalRef}></div>;
}

export default MyTerminal;
