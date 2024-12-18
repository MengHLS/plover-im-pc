import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import initDatabase from '@/db/migrations';
import {registerIpcRoutes} from '@/ipc/ipcRouter';

console.log('Node.js path module:', path); // 确认 path 模块是否正确加载
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  // 初始化数据库
  initDatabase();
  // 注册 IPC 路由
  registerIpcRoutes();

  createLoginWindow();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


function createLoginWindow() {
  // Create the browser window.
  const loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    loginWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL+"/#/login").then(r => {});
  } else {
    loginWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html/#/login`)).then(r => {});
  }


}