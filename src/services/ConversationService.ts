import { DatabaseUtil } from "@/db/DatabaseUtil";
import { Conversation } from "@/models/Conversation";

export const conversationService = {

    getAllConversations: async (userId: string) => {
        // 获取所有会话
        //...
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare(`select case
                                              when receiver_id = ? then sender_id
                                              else receiver_id end   as conversation_id,
                                          case
                                              when receiver_id = ? then sender_name
                                              else receiver_name end as name,
                                          content,
                                          receiver_name,
                                          time_stamp,
                                          create_time,
                                          receiver_type
                                   from messages
                                   where receiver_type = 0
                                   group by conversation_id
                                   order by time_stamp desc`).all(userId, userId);
        return result.map((row: any) => new Conversation(row.name, row.content, row.time_stamp, row.receiverType, row.conversation_id, row.create_time));
    },
    deleteConversation: (conversationId: string) => {

    },
};

export const conversationApiHandlers = {
    getAllConversations: conversationService.getAllConversations,
    deleteConversation: conversationService.deleteConversation,
}