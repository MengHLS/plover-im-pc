// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('api', {
    getLastMessage: () => ipcRenderer.invoke('get-last-message'),
    batchInsertMessages: (messages:any[]) => ipcRenderer.invoke('batch-insert-messages', messages),
    getValueByKey: (key: string) =>  ipcRenderer.invoke('get-value-by-key', key),
    setValueByKey: (key: string, value: string) => ipcRenderer.invoke('set-value-by-key', key, value),
    deleteValueByKey: (key: string) => ipcRenderer.invoke('delete-value-by-key', key),
    getAllConversations: (userId: string) => ipcRenderer.invoke('get-all-conversations', userId),

    loginSuccess: () => ipcRenderer.invoke('login-success')
});
