import {BrowserWindow} from "electron";
import path from "path";


export const LoginService = {
    loginSuccess: (username: string) => {
        const focusWindow = BrowserWindow.getFocusedWindow()
        if (focusWindow) {
            focusWindow.close()
        }
        createMainWindow()
    }

}
function createMainWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL).then(r => {});
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)).then(r => {});
    }
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

export const loginApiHandlers = {
    loginSuccess: LoginService.loginSuccess,
}