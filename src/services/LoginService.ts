import {BrowserWindow} from "electron";
import path from "path";
import {windowService} from "@/services/WindowService";
import {webSocketService} from "@/services/WebSocketService";
import {ACTION_TYPE} from "@/utils/enums/ActionType";
import {keyValueService} from "@/services/KeyValueService";


export const LoginService = {
    loginSuccess: () => {
        windowService.removeWindow("loginWindow");
        createMainWindow()
        const token = keyValueService.getValueByKey("token");
        const data = {
            "action": ACTION_TYPE.LOGIN,
            "data": {
                "token": token,
                "deviceType": 1,
                "osType": 3,
            }
        }
        webSocketService.init(data)
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
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL+"/conversation").then(() => {});
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html/#/conversation`)).then(() => {});
    }
    windowService.setWindow("mainWindow", mainWindow.id);
    // Open the DevTools.
    mainWindow.webContents.openDevTools({mode:"detach"});
}

export const loginApiHandlers = {
    loginSuccess: LoginService.loginSuccess,
}