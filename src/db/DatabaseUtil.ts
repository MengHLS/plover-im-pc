import Database from "better-sqlite3";

export class DatabaseUtil {
    private static instance: DatabaseUtil;
    private readonly db: Database.Database;

    private constructor(dbPath: string) {

        this.db = new Database(dbPath, {verbose: console.log});
    }

    public static getInstance(dbPath: string = 'database.sqlite'): DatabaseUtil {
        if (!DatabaseUtil.instance) {
            DatabaseUtil.instance = new DatabaseUtil(dbPath);
        }
        return DatabaseUtil.instance;
    }

    public getDatabase(): Database.Database {
        return this.db;
    }

    public close(): void {
        this.db.close();
    }

}