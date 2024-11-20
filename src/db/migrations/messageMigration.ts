// src/db/migrations/messageMigration.ts
import {DatabaseUtil} from '../DatabaseUtil';

export default function initMessageTable(): void {
    const db = DatabaseUtil.getInstance().getDatabase();
    const query = `
        CREATE TABLE IF NOT EXISTS messages (
                                                id TEXT PRIMARY KEY,           -- 消息ID，主键
                                                type INTEGER,                  -- 消息类型
                                                content TEXT,                  -- 消息内容
                                                sender_id TEXT,                -- 发送者ID
                                                sender_name TEXT,              -- 发送者名称
                                                sender_type INTEGER,           -- 发送者类型
                                                receiver_id TEXT,              -- 接收者ID
                                                receiver_name TEXT,            -- 接收者名称
                                                receiver_type INTEGER,         -- 接收者类型
                                                create_time TEXT,              -- 创建时间
                                                time_stamp INTEGER             -- 消息时间戳
        )
    `;
    db.prepare(query).run();
}
