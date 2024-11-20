import initMessageTable from './messageMigration';

export default function initDatabase(): void {
    // 初始化所有表
    initMessageTable();
    console.log('Database initialized.');
}
