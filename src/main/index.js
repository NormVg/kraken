import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join, extname } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

import os from "os";
import pty from "node-pty";
import fs from "fs";


const AppResoursePath = app.isPackaged ? join(os.homedir(), `KrakenCode`) : `./resources/`;



const checkDir  = (fullPath) =>{
  

  try {

    if (fs.lstatSync(fullPath).isDirectory()) {
      return true
    } else {
      return false
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Directory does not exist');
      return false
    } else {
      return false
    }
  }
  
}

const getCurrentShell = () => {
  const shell = process.env.SHELL || process.env.COMSPEC; // COMSPEC is used on Windows
  if (!shell) {
    return "bash";
  }

  const shellName = shell.split("/").pop().toLowerCase(); // Extracts the shell name
  console.log(shellName);
  return shellName;
};

function isImageFile(filePath) {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".tiff",
    ".svg",
"ico"
  ];
  const ext = extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}

function ReadWebAppDb(name) {
  // var dbpath = app.isPackaged
  //   ? join(process.resourcesPath, `./app/resources/db/${name}.json`)
  //   : `./resources/db/${name}.json`;

  console.log(AppResoursePath)

  const dbpath = join(AppResoursePath,`db/${name}.json`)
  

  var data = fs.readFileSync(dbpath, "utf8");
  var output = JSON.parse(data);
  console.log(output);
  return output;
}

function WriteWebAppDb(name, output) {
  // var dbpath = app.isPackaged
  //   ? join(process.resourcesPath, `./app/resources/db/${name}.json`)
  //   : `./resources/db/${name}.json`;

  const dbpath = join(AppResoursePath,`db/${name}.json`)

  let data = JSON.stringify(output, null, 2);
  fs.writeFileSync(dbpath, data);
}

function listDirectory(dirPath) {
  try {
    const files = fs.readdirSync(dirPath); // Read the directory
    return files.map((file) => {
      const fullPath = join(dirPath, file);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      const isImage = isImageFile(fullPath);
      return {
        name: file,
        path: fullPath,
        type: isDirectory ? "directory" : isImage ? "image" : "file",
      };
    });
  } catch (error) {
    console.error("Error reading directory:", error.message);
    return [];
  }
}

function setupAppFolder(){

  var iconPath = app.isPackaged
  ? join(process.resourcesPath, `./app/resources/`)
  : `./resources/`;


  const home_dir = os.homedir()
  
  if (!fs.existsSync(join(home_dir, "KrakenCode"))){
    fs.mkdirSync(join(home_dir, "KrakenCode"))
    fs.cpSync(iconPath,join(home_dir, "KrakenCode"),{recursive:true})
    console.log("<--- SETUP KRAKEN FOLDER --->")
  }



}


function createWindow() {
  // Create the browser window.

  setupAppFolder()

  // var iconPath = app.isPackaged
  // ? join(process.resourcesPath, `./app/resources/icon.png`)
  // : `./resources/icon.png`;

  const iconPath = join(AppResoursePath,"icon.png")

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    titleBarStyle: "hidden",
    transparent: true,
    frame: false,
    icon:iconPath,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation:false,
      webSecurity:false
    },
  });

  app.isPackaged? console.log('<--- DEV MODE --->') : mainWindow.webContents.openDevTools();
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  ipcMain.on("open-folder-selecter", (e) => {
    dialog
      .showOpenDialog({ properties: ["openFile", "openDirectory"] })
      .then((res) => {
        console.log(res.filePaths[0]);
        e.reply("open-folder-selecter-reply", res.filePaths[0]);
      });
  });

  
  ipcMain.on("app-prod", (e,r) => {
    
    e.reply("app-prod-reply",app.isPackaged)

  });
  


  ipcMain.on("app-close", () => {
    console.log("closeing");
    mainWindow?.close();
  });


  ipcMain.on("check-dir", (e,r) => {
    var a = checkDir(r)
    e.reply("check-dir-reply",a)
  });

  ipcMain.on("app-max", () => {
    console.log(mainWindow?.isMaximized());
    if (!mainWindow?.isMaximized()) {
      mainWindow?.maximize();
      return;
    }
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
      return;
    }
  });

  ipcMain.on("app-min", () => {
    if (!mainWindow?.isMinimized()) {
      mainWindow?.minimize();
      return;
    }
  });

  ipcMain.on("read-db", (e, r) => {
    const reply = ReadWebAppDb(r);
    e.reply("read-db-reply-" + r, reply);
  });

  ipcMain.on("write-db", (e, r) => {
    const data = JSON.parse(r);
    
    WriteWebAppDb(data.name, data.resp);
    e.reply("write-db-" + data.name, data.resp);
  });

  ipcMain.on("path-list", (e, r) => {
    e.reply("path-list-reply-" + r, JSON.stringify(listDirectory(r)));
  });


  const useBinary = os.platform() !== "win32";
  console.log(useBinary);
  var myshell = os.platform() === "win32" ? "powershell.exe" : getCurrentShell();
  var ptyProcess = pty.spawn(myshell, [], {
    name: "xterm-256color",
    // cols: 10800,
    // rows: 44,
    cwd: process.env.HOME,
    env: process.env,
    encoding: "utf-8",
  });
    

  
  

  const resizePty = (cols, rows) => {
    if (ptyProcess) {
      console.log(cols, rows);
      ptyProcess.resize(cols, rows);
    }
  };

  ptyProcess.on("data", (data) => {
    mainWindow?.webContents.send("terminal-incData", data);
  });

  ipcMain.on("terminal-into", (event, data) => {
    ptyProcess.write(data);
  });



  ipcMain.on("terminal-resize", (event, data) => {
    resizePty(data.col, data.row);
  });

  ptyProcess.on("exit", (code, signal) => {
    console.log(`Terminal exited with code ${code} and signal ${signal}`);
    mainWindow?.webContents.send("terminal-incData-exit", "TERMINAL_EXIT"); // Send exit signal to the frontend
    ptyProcess.kill();
    // mainWindow.close()

  });



  // var myshell2 = os.platform() === "win32" ? "powershell.exe" : 'bash';
  var ptyProcessSide = pty.spawn("bash", [], {
    name: "xterm-256color",
    // cols: 10800,
    // rows: 44,
    cwd: process.env.HOME,
    env: process.env,
    encoding: "utf-8",
  });





  ptyProcessSide.on("data", (data) => {
    mainWindow?.webContents.send("side-terminal-incData", data);
  });

  ipcMain.on("side-terminal-into", (event, data) => {
    ptyProcessSide.write(data);
  });



  ipcMain.on("side-terminal-resize", (event, data) => {
     
    if (ptyProcessSide) {
      console.log(data.col, data.row);
      ptyProcessSide.resize(data.col, data.row);
    }
    
  });

  ptyProcess.on("exit", (code, signal) => {
    console.log(`Terminal exited with code ${code} and signal ${signal}`);
    mainWindow?.webContents.send("side-terminal-incData-exit", "TERMINAL_EXIT"); // Send exit signal to the frontend
    ptyProcessSide.kill();
    // mainWindow.close()

  });



  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    // mainWindow.loadURL('http://localhost:5173/vs/editor/editor.main.js')
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.




app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
