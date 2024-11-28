import {Conversation} from "@/models/Conversation";
import {Message} from "@/models/Message";
import {SocketDTO} from "@/models/SocketDTO";
import {GenericCallbackWithReturn} from "@/types/CallBack";

export interface IElectronAPI {
    getLastMessage: () => Promise<Message>,
    batchInsertMessages: (messages: any[]) => Promise<void>,

    getValueByKey: (key: string) => Promise<string>,
    setValueByKey: (key: string, value: string) => Promise<void>,
    deleteValueByKey: (key: string) => Promise<void>

    getAllConversations: (userId: string) => Promise<Conversation[]>

    loginSuccess: () => Promise<void>

    init: (data:any) => Promise<void>
    send: (data: any) => Promise<void>
    close: () => Promise<void>
    onReceiveMessage: (callback:GenericCallbackWithReturn< SocketDTO>) => void
    getMessagesByConversationId: (conversationId: string) => Promise<Message[]>
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}