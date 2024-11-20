// src/ipc/ipcRouter.ts
import { ipcMain } from 'electron';
import { IPC_CHANNELS } from './ipcChannels';
import { messageApiHandlers } from '@/services/MessageService';

export function registerIpcRoutes(): void {
    const routes = {
        [IPC_CHANNELS.GET_ALL_MESSAGES]: messageApiHandlers.getAllMessages,
        [IPC_CHANNELS.ADD_MESSAGE]: messageApiHandlers.addMessage,
        [IPC_CHANNELS.DELETE_MESSAGE]: messageApiHandlers.deleteMessage,
        [IPC_CHANNELS.GET_LAST_MESSAGE]: messageApiHandlers.getLastMessage,
        [IPC_CHANNELS.BATCH_INSERT_MESSAGES]: messageApiHandlers.batchInsertMessages
        // Add more routes as needed

    };

    for (const [channel, handler] of Object.entries(routes)) {
        ipcMain.handle(channel, (_event, ...args: any[]) => (handler as (...args: any[]) => any)(...args));
    }
}
