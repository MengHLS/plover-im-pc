import WebSocketClass from "@/utils/webSocket";
import {WEBSOCKET_TYPE} from "@/utils/enums/webSocketType";
import {BrowserWindow} from "electron";

export const webSocketService = {

    init(data: any): void {
        const url = getWebsocketOrigin();
        console.log("ws地址========="+ url)
        webSocket = new WebSocketClass(url, response=>{
            if (response && response.action === WEBSOCKET_TYPE.HEARTBEAT) {
                return
            }
            if (response && response.action === WEBSOCKET_TYPE.LOGIN_SUCCESS){
                console.log("🚲~~:即时通讯登陆成功！", )
                webSocket.heartHandler()
                return;
            }
            if (response && response.action === WEBSOCKET_TYPE.PRIVATE_CHAT_MESSAGE){
                // rootStore.onReceiveMessage(data)
                const mainWindow = BrowserWindow.getFocusedWindow()
                mainWindow.webContents.send("private_message", response)
                return;
            }
            this.response = response
            console.log('🚲~~:', response)
        })
        webSocket.connect(data)
    },
    send(data: any): void {
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



let webSocket = null
/**
 * 获取websock链接地址
 */
function getWebsocketOrigin() {

    return "ws://localhost:8080/ws"
}