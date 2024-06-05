const { app, BrowserWindow,ipcMain,dialog } = require('electron');
const path = require('node:path');

const os = require('os');
const pty = require('node-pty');

require('@electron/remote/main').initialize()

// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

const createWindow = () => {
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag:true,
    },
    
    titleBarStyle: 'hidden',
    transparent: true,
    frame:false,
    
  });

  mainWindow.setIcon(path.join(__dirname, './icon.png'))
  mainWindow.loadURL("http://localhost:3000")
  mainWindow.reload()
  require('@electron/remote/main').enable(mainWindow.webContents)
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.setMenuBarVisibility(false)

  ipcMain.on("open-folder-selecter",(e)=>{
    dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then(res => {
      console.log(res.filePaths[0])
      e.reply("open-folder-selecter-reply",res.filePaths[0])
    })
  })
  
  ipcMain.on("app-close",()=>{
    mainWindow.close()
  })

  ipcMain.on("app-max",()=>{
    console.log(mainWindow.isMaximized())
    if (!mainWindow.isMaximized()){
      mainWindow.maximize()
      return
    }
    if (mainWindow.isMaximized() ){
      mainWindow.unmaximize()
      return
    }
  })

  ipcMain.on("app-min",()=>{
    if (!mainWindow.isMinimized()){
      mainWindow.minimize()
      return
    }
    
  })

  var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
  var ptyProcess = pty.spawn(shell, [], {
          name: 'xterm-color',
          cols: 80,
          rows: 24,
          cwd: process.env.HOME,
          env: process.env
      });

      mainWindow.webContents.send("terminal-incData", "neofetch");
      ptyProcess.on("data", (data) => {
        mainWindow.webContents.send("terminal-incData", data);
      });
  
      ipcMain.on("terminal-into", (event, data)=> {
        ptyProcess.write(data);
      })



};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
