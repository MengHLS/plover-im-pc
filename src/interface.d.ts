export interface IElectronAPI {
    getLastMessage: () => Promise<void>,
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}