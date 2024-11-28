import {DatabaseUtil} from "@/db/DatabaseUtil";

export const keyValueService = {

    setValueByKey:async (key: string, value: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        db.prepare('INSERT OR REPLACE INTO key_value_store (id, value) VALUES (?,?)').run(key.toString(), value.toString());
    },
    getValueByKey: (key: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        const result = db.prepare('SELECT value FROM key_value_store WHERE id =?').get(key.toString()) as{value: string | null}
        return result? result.value : null;
    },
    deleteValueByKey: async (key: string) => {
        const db = DatabaseUtil.getInstance().getDatabase();
        db.prepare('DELETE FROM key_value_store WHERE id =?').run(key.toString());
    }
}

export const keyValueApiHandlers = {
    getValueByKey:keyValueService.getValueByKey,
    setValueByKey: keyValueService.setValueByKey,
    deleteValueByKey: keyValueService.deleteValueByKey,
}