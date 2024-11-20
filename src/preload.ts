// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    insert: (value: string) => ipcRenderer.invoke('db:insert', value),
    fetch: () => ipcRenderer.invoke('db:fetch'),
});