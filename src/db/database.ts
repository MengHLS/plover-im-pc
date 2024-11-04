import sqlite from 'better-sqlite3'
import {join} from 'path'

const dbPath = join(__dirname, 'database.sqlite')
export const db = new sqlite(dbPath)

export const initDb = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS todos
        (
            id
            INTEGER
            PRIMARY
            KEY
            AUTOINCREMENT,
            text
            TEXT
            NOT
            NULL,
            completed
            INTEGER
            NOT
            NULL
            DEFAULT
            0
        );
    `).run()
}

export default {
    db,
    initDb,
}
