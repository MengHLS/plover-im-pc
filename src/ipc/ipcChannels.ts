// src/ipc/ipcChannels.ts
export const IPC_CHANNELS = {
    GET_ALL_MESSAGES: 'get-all-messages',
    ADD_MESSAGE: 'add-message',
    DELETE_MESSAGE: 'delete-message',
    GET_LAST_MESSAGE: 'get-last-message',
    BATCH_INSERT_MESSAGES: 'batch-insert-messages',

    // Add more IPC channels as needed
    GET_VALUE_BY_KEY: 'get-value-by-key',
    SET_VALUE_BY_KEY: 'set-value-by-key',
    DELETE_VALUE_BY_KEY: 'delete-value-by-key',

    GET_ALL_CONVERSATIONS: 'get-all-conversations',

    LOGIN_SUCCESS: 'login-success',

    INIT: 'init',
    SEND: 'send',
    CLOSE: 'close'
};
