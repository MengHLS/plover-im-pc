import {BrowserWindow} from "electron";

export const windowService ={
    setWindow(name: string, id: number): void {
        windows.set(name, id)
    },
    getWindow(name: string): BrowserWindow | undefined {
        console.log( windows)
        if (windows.has(name)){
            return BrowserWindow.fromId(windows.get(name))
        }
        return null
    },
    removeWindow(name: string): void {
        console.log("===关闭窗口===" + windows)
        if (windows.has(name)) {
            const window = BrowserWindow.fromId(windows.get(name))
            if (window) {
                window.close()
                windows.delete(name)
            }
        }
    },
}
const windows = new Map<string,number>()