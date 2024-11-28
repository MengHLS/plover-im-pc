import {defineStore} from "pinia";
import {messageSync} from "@/api/message";
import {reactive} from "vue";
import {Message} from "@/models/Message";


export const useMessageStore = defineStore(
    'message', {
        state: () => ({
            list: reactive([
                {
                    conversationId: String,
                    messages: [] as Message[],
                },{
                deep:true
                }
            ]),
            messageMap: reactive(new Map<String, Message[]>()),
        }),
        actions: {
            syncMessage: async function () {
                //获取数据库中最新的一条消息
                const message = await window.api.getLastMessage()
                console.log(message)
                let timeStamp = Date.now()

                if (message != null) {
                    timeStamp = message.timeStamp
                }
                this.syncMessagePage(timeStamp, 100)
            },
            syncMessagePage(timeStamp: number, pageSize: number) {
                let params = {
                    timeStamp: timeStamp,
                    pageSize: pageSize,
                }
                messageSync(params).then(async r => {
                    if (r.data.records.length > 0) {
                        await window.api.batchInsertMessages(r.data.records)
                    }
                    if (r.data.records === pageSize) {
                        timeStamp = r.data.records[r.data.records.length - 1].timestamp
                        await this.syncMessagePage(timeStamp, pageSize)
                    }
                })
            },
            async fetchMessages(conversationId: string) {
                console.log('Fetching messages')
                let messages = this.messageMap.get(conversationId)
                if (messages){
                    return messages
                }
                messages = await window.api.getMessagesByConversationId(conversationId) as Message[]
                messages.reverse()
                this.messageMap.set(conversationId, messages)
            }
        }
    })