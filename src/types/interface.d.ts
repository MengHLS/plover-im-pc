import {Conversation} from "@/models/Conversation";

export interface IElectronAPI {
    getLastMessage: () => Promise<void>,
    batchInsertMessages: (messages: any[]) => Promise<void>,

    getValueByKey: (key: string) => Promise<string>,
    setValueByKey: (key: string, value: string) => Promise<void>,
    deleteValueByKey: (key: string) => Promise<void>

    getAllConversations: (userId: string) => Promise<Conversation[]>
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}