// src/services/MessageService.ts
import { DatabaseUtil } from '@/db/DatabaseUtil';
import { Message } from '@/models/Message';

export const messageService = {
    // 获取所有消息
    getAllMessages: async () => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare('SELECT * FROM messages').all();
        return result.map(
            (row: any) => new Message(
                row.id,
                row.type,
                row.content,
                row.sender_id,
                row.sender_name,
                row.sender_type,
                row.receiver_id,
                row.receiver_name,
                row.receiver_type,
                row.create_time,
                row.time_stamp
            )
        );
    },

    // 添加消息
    addMessage: async (message: Message) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const query = `
      INSERT INTO messages (id, type, content, sender_id, sender_name, sender_type, receiver_id, receiver_name, receiver_type, create_time, time_stamp) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        db.prepare(query).run(
            message.id,
            message.type,
            message.content,
            message.senderId,
            message.senderName,
            message.senderType,
            message.receiverId,
            message.receiverName,
            message.receiverType,
            message.createTime,
            message.timeStamp
        );
    },

    // 删除消息
    deleteMessage: async (messageId: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        db.prepare('DELETE FROM messages WHERE id = ?').run(messageId);
    },
    //获取最新的一条消息
    getLastMessage: async () => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare('SELECT * FROM messages ORDER BY time_stamp DESC LIMIT 1').get() as {
            id: string;
            type: number;
            content: string;
            sender_id: string;
            sender_name: string;
            sender_type: number;
            receiver_id: string;
            receiver_name: string;
            receiver_type: number;
            create_time: string;
            time_stamp: number;
        };
        if (result) {
            return new Message(
                result.id ,
                result.type,
                result.content,
                result.sender_id,
                result.sender_name,
                result.sender_type,
                result.receiver_id,
                result.receiver_name,
                result.receiver_type,
                result.create_time,
                result.time_stamp
            );
        } else {
            return null;
        }
    },
    // 批量插入消息
    batchInsertMessages: async (messages: Message[]) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const query = `
      INSERT INTO messages (id, type, content, sender_id, sender_name, sender_type, receiver_id, receiver_name, receiver_type, create_time, time_stamp) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;
        const stmt = db.prepare(query);
        messages.forEach(message => {
            stmt.run(
                message.id,
                message.type,
                message.content,
                message.senderId,
                message.senderName,
                message.senderType,
                message.receiverId,
                message.receiverName,
                message.receiverType,
                message.createTime,
                message.timeStamp
            );
        });
    }
};

export const messageApiHandlers = {
    getAllMessages: messageService.getAllMessages,
    addMessage: messageService.addMessage,
    deleteMessage: messageService.deleteMessage,
    getLastMessage: messageService.getLastMessage,
    batchInsertMessages: messageService.batchInsertMessages
}