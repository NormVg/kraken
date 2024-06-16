/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

import path from 'path';
import { app, BrowserWindow, shell, ipcMain ,dialog} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import { resolveHtmlPath } from './util';

const os = require('os');
const pty = require('node-pty');
var fs = require("fs");

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// MY EVENTS

ipcMain.on("open-folder-selecter",(e)=>{
  dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then(res => {
    console.log(res.filePaths[0])
    e.reply("open-folder-selecter-reply",res.filePaths[0])
  })
})

ipcMain.on("app-close",()=>{
  mainWindow?.close()
})

ipcMain.on("app-max",()=>{
  console.log(mainWindow?.isMaximized())
  if (!mainWindow?.isMaximized()){
    mainWindow?.maximize()
    return
  }
  if (mainWindow?.isMaximized() ){
    mainWindow?.unmaximize()
    return
  }
})

ipcMain.on("app-min",()=>{
  if (!mainWindow?.isMinimized()){
    mainWindow?.minimize()
    return
  }
  
})

// MY EVENTS CLOSE 


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: app.isPackaged ?  getAssetPath('icon.png') : "assets/icon.png",
    webPreferences: {
      nodeIntegration:true,
      webviewTag:true,
      contextIsolation:false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.ts')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    titleBarStyle: 'hidden',
    transparent: true,
    frame:false,
  });


  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false)


  mainWindow.loadURL(resolveHtmlPath('index.html'));
  
  function ReadWebAppDb (){
    
    var dbpath = getAssetPath( 'db/AppDataDb.json')
    console.log(dbpath)
    var data = fs.readFileSync(dbpath, 'utf8')
    var output = JSON.parse(data);
    console.log(data)
    output.forEach(element=> {
      if (!element.iconUrl){
        if (app.isPackaged){
          element.icon = getAssetPath( 'db/AppIcon/'+ element.icon)
          element.iconUrl = true
        }
      }
      // element.icon = element.iconUrl? null : app.isPackaged ? getAssetPath( 'db/AppIcon/'+ element.icon) : element.icon
      
      
    });
    
    console.log(output)
    return output

  }
  
  function WriteWebAppDb(output: any){
      var dbpath = getAssetPath( 'db/AppDataDb.json')
      let data = JSON.stringify(output, null, 2);
      fs.writeFileSync(dbpath, data);
      
  }
  
  ipcMain.on("webapplist-read-0", (event, data)=> {
    event.reply("webapplist-read-1",ReadWebAppDb()) 
  })

  ipcMain.on("webapplist-write-0", (event, data)=> {

    WriteWebAppDb(data)
    event.reply("webapplist-read-1",ReadWebAppDb()) 
  })

  var myshell = os.platform() === "win32" ? "powershell.exe" : "bash";
  var ptyProcess = pty.spawn(myshell, [], {
          name: 'xterm-color',
          cols: 10800,
          rows: 44,
          cwd: process.env.HOME,
          env: process.env
      });

      
      // mainWindow.webContents.send("terminal-incData", "neofetch");
      ptyProcess.on("data", (data:any) => {
        mainWindow?.webContents.send("terminal-incData", data);
      });
      


      ipcMain.on("terminal-into", (event, data)=> {
        ptyProcess.write(data);
      })
      




  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });



  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });



  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
