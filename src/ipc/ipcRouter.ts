// src/ipc/ipcRouter.ts
import {ipcMain} from 'electron';
import {IPC_CHANNELS} from './ipcChannels';
import {messageApiHandlers} from '@/services/MessageService';
import {keyValueApiHandlers} from "@/services/KeyValueService";
import {conversationApiHandlers} from "@/services/ConversationService";
import {loginApiHandlers} from "@/services/LoginService";

export function registerIpcRoutes(): void {
    const routes = {
        [IPC_CHANNELS.GET_ALL_MESSAGES]: messageApiHandlers.getAllMessages,
        [IPC_CHANNELS.ADD_MESSAGE]: messageApiHandlers.addMessage,
        [IPC_CHANNELS.DELETE_MESSAGE]: messageApiHandlers.deleteMessage,
        [IPC_CHANNELS.GET_LAST_MESSAGE]: messageApiHandlers.getLastMessage,
        [IPC_CHANNELS.BATCH_INSERT_MESSAGES]: messageApiHandlers.batchInsertMessages,
        // Add more routes as needed
        [IPC_CHANNELS.GET_VALUE_BY_KEY]: keyValueApiHandlers.getValueByKey,
        [IPC_CHANNELS.SET_VALUE_BY_KEY]: keyValueApiHandlers.setValueByKey,
        [IPC_CHANNELS.DELETE_VALUE_BY_KEY]: keyValueApiHandlers.deleteValueByKey,
        // Add more IPC routes as needed
        [IPC_CHANNELS.GET_ALL_CONVERSATIONS]: conversationApiHandlers.getAllConversations,

        [IPC_CHANNELS.LOGIN_SUCCESS]: loginApiHandlers.loginSuccess,
    };

    for (const [channel, handler] of Object.entries(routes)) {
        ipcMain.handle(channel, (_event, ...args: any[]) => (handler as (...args: any[]) => any)(...args));
    }
}
