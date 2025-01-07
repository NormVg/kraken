import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join, extname } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

import fs from "fs";

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
  var dbpath = app.isPackaged
    ? join(process.resourcesPath, `./app/resources/db/${name}.json`)
    : `./resources/db/${name}.json`;
  var data = fs.readFileSync(dbpath, "utf8");
  var output = JSON.parse(data);
  console.log(output);
  return output;
}

function WriteWebAppDb(name, output) {
  var dbpath = app.isPackaged
    ? join(process.resourcesPath, `./app/resources/db/${name}.json`)
    : `./resources/db/${name}.json`;
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

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    titleBarStyle: "hidden",
    transparent: true,
    frame: false,

    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  mainWindow.webContents.openDevTools();
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

  ipcMain.on("app-close", () => {
    console.log("closeing");
    mainWindow?.close();
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
