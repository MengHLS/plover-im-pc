import WebSocket from "ws";
import {WEBSOCKET_TYPE} from "@/utils/enums/webSocketType";
import {getToken} from "@/utils/auth";

type CallbackWithReturn = (num: string) => string;

export default  class  WebSocketClass{
    private url: string;
    private callback: CallbackWithReturn;
    private ws: WebSocket;
    private status: number;
    private ping: number;
    private pingInterval: NodeJS.Timeout;
    private reconnect: number;

    constructor(url: string, callback: CallbackWithReturn ) {
        this.url = url
        this.callback = callback
        this.ws = null // websocket 对象
        this.status = 0 // 连接状态: 0-关闭 1-连接 2-手动关闭
        this.ping = 20000 // 心跳时长
        this.pingInterval = null // 心跳定时器
        this.reconnect = 5000 // 重连间隔
    }
    connect(data?: any) {
        console.log(this.url)
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => {
            this.status = 1
            this.login(data)
            console.log('WebSocket 已连接');
        }
        this.ws.onerror = (error) => {
            console.error('WebSocket 发生了错误', error);
        }
        this.ws.onclose = (e) => {
            this.onClose(e)
        }
        this.ws.onmessage = (e) => {
            if (typeof e.data === "string") {
                const message = JSON.parse(e.data)
                console.log('WebSocket 收到消息', message);
                this.callback(message)
            }
        }
    }

    /**
     * @description: 关闭weibsocket 主动关闭不会触发重连
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    close() {
        this.status = 2
        this.ws.close()
    }

    /**
     * @description: socket关闭事件
     * @return {*}
     * @author: gumingchen
     * @param e
     */
    onClose(e: WebSocket.CloseEvent) {
        console.error(e)
        this.status = this.status === 2 ? this.status : 0
        setTimeout(() => {
            if (this.status === 0) {
                this.connect()
            }
        }, this.reconnect)
    }

    /**
     * @description: 心跳机制
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    heartHandler() {
        const data = {
            action: WEBSOCKET_TYPE.HEARTBEAT
        }
        this.pingInterval = setInterval(() => {
            if (this.status === 1) {
                this.ws.send(JSON.stringify(data))
            } else {
                clearInterval(this.pingInterval)
            }
        }, this.ping)
    }

    /**
     * 处理登录
     */
    login( data: any){
        this.send(data)
    }


    /**
     * @description: 发送消息
     * @param {*} data
     * @return {*}
     * @author: gumingchen
     */
    send(data: any) {
        return this.ws.send(JSON.stringify(data))
    }
}