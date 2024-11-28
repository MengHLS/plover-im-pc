import WebSocketClass from "@/utils/webSocket";
import {ACTION_TYPE} from "@/utils/enums/ActionType";
import {BrowserWindow} from "electron";
import {SocketDTO} from "@/models/SocketDTO";
import {windowService} from "@/services/WindowService";

export const webSocketService = {

    init(data: any): void {
        const url = getWebsocketOrigin();
        mainWindow = windowService.getWindow("mainWindow")
        webSocket = new WebSocketClass(url, (response: SocketDTO)=>{
            if (response && response.action === ACTION_TYPE.HEARTBEAT) {
                return
            }
            if (response && response.action === ACTION_TYPE.LOGIN_SUCCESS){
                console.log("🚲~~:即时通讯登陆成功！", )
                webSocket.heartHandler()
                return;
            }
            if (response && response.action === ACTION_TYPE.PRIVATE_CHAT_MESSAGE){
                mainWindow.webContents.send("socket_message", response)
                return;
            }
            console.log('🚲~~:', response)
        })
        webSocket.connect(data)
    },
    send(data: SocketDTO): void {
        webSocket.send(data)
    },
    close(): void{
        if (webSocket){
            webSocket.close()
        }
        webSocket = null
    }
}

export const webSocketApiHandler={
    init: webSocketService.init,
    send: webSocketService.send,
    close: webSocketService.close,
}


let mainWindow:BrowserWindow = null
let webSocket:WebSocketClass = null
/**
 * 获取websock链接地址
 */
function getWebsocketOrigin() {

    return "ws://localhost:8080/ws"
}