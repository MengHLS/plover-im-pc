export type CallBack = () => void;
export type GenericCallback<T> = (input: T) => void;
export type GenericCallbackWithReturn<T, R> = (input: T) => R;

