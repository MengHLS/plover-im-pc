export class Conversation {
    conversationId: string
    name: string
    content: string
    timeStamp: number
    createTime: string
    conversationType: number

    constructor(name: string, content: string, timeStamp: number,
                conversationType: number = 0, conversationId: string, createTime?: string) {
        this.name = name
        this.content = content
        this.timeStamp = timeStamp
        this.conversationType = conversationType
        this.createTime = createTime
        this.conversationId = conversationId
    }
}