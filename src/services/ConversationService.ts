import {DatabaseUtil} from "@/db/DatabaseUtil";
import {Conversation} from "@/models/Conversation";

export const ConversationService = {

    getAllConversations: async (userId: string) => {
        // 获取所有��天会话
        //...
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare('select case  when receiver_id= ? then sender_id\n' +
            '    else receiver_id end as conversation_id  ,\n' +
            '    case when receiver_id = ? then sender_name\n' +
            '        else receiver_name end as name,\n' +
            '    content ,\n' +
            '    receiver_name, time_stamp, create_time, receiver_type from  messages where receiver_type = 0 group by conversation_id\n' +
            'order by time_stamp desc').all(userId, userId);
        return result.map((row: any) => new Conversation(row.name, row.content, row.time_stamp,row.receiverType, row.conversation_id, row.create_time));
    }
}

export const conversationApiHandlers = {
    getAllConversations: ConversationService.getAllConversations,
}