import {defineStore} from "pinia";
import {SocketDTO} from "@/models/SocketDTO";
import {ACTION_TYPE} from "@/utils/enums/ActionType";
import {Message} from "@/models/Message";
import {Conversation} from "@/models/Conversation";


export const useConversationStore = defineStore('conversation', {
    state: () => ({
        conversations: [],
    }),
    actions: {
        async syncConversations() {
            // 获取数据库中所有
            const conversations = await window.api.getAllConversations('userId')
            conversations.forEach( conversation => this.conversations.push(conversation))
            return conversations
        },
        receiveMessage(socketDTO:SocketDTO) {
            if (socketDTO.action === ACTION_TYPE.PRIVATE_CHAT_MESSAGE){
                const message:Message = socketDTO.data
                const conversation:Conversation = this.conversations.find((c:Conversation)=>c.conversationId === message.senderId)
                if (conversation) {

                }
            }
        }
    },
})