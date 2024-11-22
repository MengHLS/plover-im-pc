// src/db/migrations/messageMigration.ts
import {DatabaseUtil} from '../DatabaseUtil';

export default function initKeyValueTable(): void {
    const db = DatabaseUtil.getInstance().getDatabase();
    const query = `
        CREATE TABLE IF NOT EXISTS key_value_store (
                                                id TEXT PRIMARY KEY,           -- 消息ID，主键
                                                value TEXT                  -- 消息类型
                                        
        )
    `;
    db.prepare(query).run();
}
