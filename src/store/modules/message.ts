import {defineStore} from "pinia";
import {messageApiHandlers} from "@/services/MessageService";
import {Message} from "@/models/Message";
import {messageSync} from "@/api/message";

export const messageStore = defineStore(
    'message', {
        state: () => ({
            messages: []
        }),
        actions: {
            async getAllMessages() {
                const messages = await messageApiHandlers.getAllMessages()
                this.messages = messages
            },
            async addMessage(message: Message) {
                await messageApiHandlers.addMessage(message)
                this.messages.push(message)
            },
            async deleteMessage(id: string) {
                await messageApiHandlers.deleteMessage(id)
            },
            syncMessage() {
                //获取数据库中最新的一条消息

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
                        await messageApiHandlers.batchInsertMessages(r.data.records)
                    }
                    if (r.data.records === pageSize) {
                        await this.syncMessagePage(timeStamp, pageSize, pageNum + 1)
                    }
                })
            }
        }
    })