// src/models/Message.ts

export class Message {
    id: string;
    type: number;
    content: string;
    senderId: string;
    senderName: string;
    senderType: number;
    receiverId: string;
    receiverName: string;
    receiverType: number;
    createTime: string;
    timeStamp: number;

    constructor(
        id: string,
        type: number,
        content: string,
        senderId: string,
        senderName: string,
        senderType: number,
        receiverId: string,
        receiverName: string,
        receiverType: number,
        createTime: string,
        timeStamp: number
    ) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.senderId = senderId;
        this.senderName = senderName;
        this.senderType = senderType;
        this.receiverId = receiverId;
        this.receiverName = receiverName;
        this.receiverType = receiverType;
        this.createTime = createTime;
        this.timeStamp = timeStamp;
    }
}
