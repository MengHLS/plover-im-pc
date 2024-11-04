import {db} from '../db/database'

class Todo {
    private readonly text: string;
    private readonly completed: boolean;
    private id: string;
    constructor(text:string, completed = false) {
        this.text = text
        this.completed = completed
    }

    save() {
        const stmt = db.prepare(`
      INSERT INTO todos (text, completed)
      VALUES (?, ?)
    `)
        stmt.run(this.text, this.completed ? 1 : 0)
    }

    static findAll() {
        const stmt = db.prepare(`
      SELECT *
      FROM todos
    `)
        const rows = stmt.all()
        return rows.map((row: { text: string; completed: boolean; }) => new Todo(row.text, row.completed))
    }

    static findById(id: any) {
        const stmt = db.prepare(`
      SELECT *
      FROM todos
      WHERE id = ?
    `)
        const row = stmt.get(id)
        return row ? new Todo(row.text, row.completed) : null
    }

    update() {
        const stmt = db.prepare(`
      UPDATE todos
      SET text = ?, completed = ?
      WHERE id = ?
    `)
        stmt.run(this.text, this.completed ? 1 : 0, this.id)
    }

    delete() {
        const stmt = db.prepare(`
      DELETE FROM todos
      WHERE id = ?
    `)
        stmt.run(this.id)
    }
}

module.exports = Todo