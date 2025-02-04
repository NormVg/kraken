<template>
  <div class="terminal-container" ref="terminalRef"></div>
</template>

<script setup>
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { WebglAddon } from "@xterm/addon-webgl";
// import { ImageAddon } from "@xterm/addon-image";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { SerializeAddon } from "@xterm/addon-serialize";
import { useWinBasicStore } from "../stores/basicInfo";


const WinBasic = useWinBasicStore()

const customSettings = {
  enableSizeReports: true, // whether to enable CSI t reports (see below)
  pixelLimit: 16777216, // max. pixel size of a single image
  sixelSupport: true, // enable sixel support
  sixelScrolling: true, // whether to scroll on image output
  sixelPaletteLimit: 256, // initial sixel palette size
  sixelSizeLimit: 25000000, // size limit of a single sixel sequence
  storageLimit: 128, // FIFO storage limit in MB
  showPlaceholder: true, // whether to show a placeholder for evicted images
  iipSupport: true, // enable iTerm IIP support
  iipSizeLimit: 20000000, // size limit of a single IIP sequence
};

const KrakenTheme = {
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

const vercel_theme = {
  foreground: "#DCE3EA",
  background: "#000000",
  selectionBackground: "#43AAF933",
  selectionInactiveBackground: "#454d54AA",
  black: "#34393E",
  brightBlack: "#454d54",
  red: "#E61F44",
  brightRed: "#E61F44",
  green: "#62c073",
  brightGreen: "#B7F0E5",
  yellow: "#43AAF9",
  brightYellow: "#A7D1F5",
  blue: "#43AAF9",
  brightBlue: "#A7D1F5",
  magenta: "#f75f8f",
  brightMagenta: "#f75f8f",
  cyan: "#B267E6",
  brightCyan: "#D7C9F0",
  white: "#DCE3EA",
  brightWhite: "#DCE3EA",
};

const terminalRef = ref(null);
let terminal;
let fitAddon;

const initializeTerminal = () => {
  terminal = new Terminal({
    theme: KrakenTheme,
    convertEol: true,
    allowProposedApi: true,
    backend: "conpty",
    buildNumber: 22621,

    fontFamily: "CaskaydiaCove Nerd Font Mono",
    fontWeight: "normal",
    fontSize: "14",
  });

  const WebGLaddon = new WebglAddon();
  WebGLaddon.onContextLoss((e) => {
    WebGLaddon.dispose();
  });
  terminal.loadAddon(WebGLaddon);
  terminal.open(terminalRef.value);
  fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);

  const clipboardAddon = new ClipboardAddon({
    copy: (text) => navigator.clipboard.writeText(text),
    paste: () => navigator.clipboard.readText(),
  });
  terminal.loadAddon(clipboardAddon);
  terminal.loadAddon(new WebLinksAddon());

  const serializeAddon = new SerializeAddon();
  terminal.loadAddon(serializeAddon);

  const adjustSize = () => {
    fitAddon.fit(); // Adjust terminal to the container
    const { cols, rows } = terminal; // Get new dimensions
    // resizePty(cols, rows);
    window.electron.ipcRenderer.send("terminal-resize", {
      row: rows,
      col: cols,
    });
    // Resize the pty process
  };

  adjustSize();
  // this.addEventListener('resize',adjustSize)
  window.addEventListener("resize", adjustSize);

  terminal.onKey((e) => {
    console.log(e.key);
    window.electron.ipcRenderer.send("terminal-into", e.key);
    fitAddon.fit();
  });

  window.electron.ipcRenderer.on("terminal-incData", (event, data) => {
    terminal.write(data);

    fitAddon.fit();
  });

  window.electron.ipcRenderer.on("terminal-incData-exit", (event, data) => {
    handleTerminalExit();
  });

  terminal.attachCustomKeyEventHandler((e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "ArrowRight") {
      WinBasic.NextCurrentScreenWindow()
      return false;
    }

    if (e.ctrlKey && e.shiftKey && e.code === "ArrowLeft") {
      WinBasic.PrevCurrentScreenWindow()
      return false;
    }

    return true
  });

  // terminal.attachCustomKeyEventHandler((event) => {
  //   if (event.ctrlKey && event.shiftKey && event.code === "KeyC") {
  //     console.log("Copying selected text...");
  //     const selection = terminal.getSelection();
  //     navigator.clipboard.writeText(selection);
  //     return false; // Prevent default behavior
  //   }

  //   if (event.ctrlKey && event.shiftKey && event.code === "KeyV") {
  //     console.log("Pasting clipboard content...");
  //     navigator.clipboard.readText().then((text) => terminal.write(text));
  //     return false; // Prevent default behavior
  //   }

  //   return true; // Allow other keys to propagate
  // });
};

const handleTerminalExit = () => {
  alert("The terminal process has exited!"); // Example action
};

onMounted(() => {
  initializeTerminal();
});

onBeforeUnmount(() => {
  terminal?.dispose();
});
</script>

<style scoped>
.terminal-container {
  height: 80vh;
  margin-top: 10px;
  padding: 10px 5px;
  border-radius: 10px;
  width: calc(100% - 30px);

  background-color: #0a0d18;
  margin-right: 15px;
  margin-left: 15px;
  overflow-x: hidden;
  /* border: 1px solid red; */
}
</style>
