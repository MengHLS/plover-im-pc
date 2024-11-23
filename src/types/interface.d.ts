import {Conversation} from "@/models/Conversation";
import {Message} from "@/models/Message";

export interface IElectronAPI {
    getLastMessage: () => Promise<Message>,
    batchInsertMessages: (messages: any[]) => Promise<void>,

    getValueByKey: (key: string) => Promise<string>,
    setValueByKey: (key: string, value: string) => Promise<void>,
    deleteValueByKey: (key: string) => Promise<void>

    getAllConversations: (userId: string) => Promise<Conversation[]>

    loginSuccess: (userId: string) => void
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}