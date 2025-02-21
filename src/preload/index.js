import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import fs from "fs";
import os from "os"
import path from "path"
// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('fs', fs)
    contextBridge.exposeInMainWorld('os', os)
    contextBridge.exposeInMainWorld('os', path)


  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.fs = fs
  window.os = os
  window.path = path


}
