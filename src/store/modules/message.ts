import {defineStore} from "pinia";
import {messageSync} from "@/api/message";


export const messageStore = defineStore(
    'message', {
        state: () => ({
            messages: []
        }),
        actions: {
            syncMessage: async function () {
                //获取数据库中最新的一条消息
                const message = await window.api.getLastMessage()
                // const message = null;
                console.log(message)
                let timeStamp = Date.now()
                this.syncMessagePage(timeStamp, 100, 1)
            },
            syncMessagePage(timeStamp: number, pageSize: number, pageNum: number) {
                let params = {
                    timeStamp: timeStamp,
                    pageSize: pageSize,
                    pageNum: pageNum,
                }
                messageSync(params).then(async r => {
                    console.log(r.data)
                    if (r.data.records.length > 0) {
                        // await messageApiHandlers.batchInsertMessages(r.data.records)
                    }
                    if (r.data.records === pageSize) {
                        await this.syncMessagePage(timeStamp, pageSize, pageNum + 1)
                    }
                })
            }
        }
    })