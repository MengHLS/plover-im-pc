import initMessageTable from './messageMigration';
import initKeyValueTable from "@/db/migrations/keyValueMigration";

export default function initDatabase(): void {
    // 初始化所有表
    initMessageTable();
    initKeyValueTable();
    console.log('Database initialized.');
}
