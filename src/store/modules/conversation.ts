

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
    },
})