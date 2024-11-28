import {defineStore} from "pinia";
import {SocketDTO} from "@/models/SocketDTO";
import {ACTION_TYPE} from "@/utils/enums/ActionType";
import {Message} from "@/models/Message";
import {Conversation} from "@/models/Conversation";
import {reactive} from "vue";
import {useUserStore} from "@/store/modules/user";

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        conversations: reactive([]),
        active: Conversation
    }),
    actions: {
        async syncConversations() {
            // 获取数据库中所有会话
            const userStore = useUserStore()
            const conversations = await window.api.getAllConversations(userStore.id)
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
        },
        setActive(value:Conversation){
            this.active = value
        },
    },
})