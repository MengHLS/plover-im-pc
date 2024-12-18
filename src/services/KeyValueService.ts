import {DatabaseUtil} from "@/db/DatabaseUtil";

export const KeyValueService = {

    setValueByKey:async (key: string, value: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        db.prepare('INSERT OR REPLACE INTO key_value_store (id, value) VALUES (?,?)').run(key, value);
    },
    getValueByKey: (key: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare('SELECT value FROM key_value_store WHERE id =?').get(key);
        console.log(result)
        return result? result.value : null;
    },
    deleteValueByKey: async (key: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        db.prepare('DELETE FROM key_value_store WHERE id =?').run(key);
    }
}

export const keyValueApiHandlers = {
    getValueByKey:KeyValueService.getValueByKey,
    setValueByKey: KeyValueService.setValueByKey,
    deleteValueByKey: KeyValueService.deleteValueByKey,
}